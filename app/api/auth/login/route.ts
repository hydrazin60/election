import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { loginRequestSchema } from "@/lib/validation/auth.validation";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/package/toke";
import { sendError } from "@/utils/NextResponse";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const data = loginRequestSchema.parse(body);

    const { email, phone, password } = data;

    if (!email && !phone) {
      return sendError("Email or Phone is required", 400);
    }

    if (!password) {
      return sendError("Password is required", 400);
    }

    const user = await User.findOne(email ? { email } : { phone });

    if (!user) {
      return sendError("User not found", 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return sendError("Invalid password", 401);
    }

    const token = generateToken({
      _id: user._id.toString(),
      email: user.email!,
      role: user.role!,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user._id,
          full_name: user.full_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });

    return response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return sendError(message, 500);
  }
}
