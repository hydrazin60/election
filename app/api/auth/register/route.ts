import { connectDB } from "@/lib/db";
import { registerRequestSchema } from "@/lib/validation/auth.validation";
import { getAuthenticatedStaff } from "@/middlewar/isAuthenticated";
import user from "@/models/user";
import { sendError } from "@/utils/NextResponse";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const userData = await getAuthenticatedStaff();
    if (userData.role !== "admin") {
      return sendError("Unauthorized: Admin access required", 403);
    }
    const body = await req.json();
    const data = registerRequestSchema.parse(body);
    const { email, password, full_name, phone, role, location } = data;
    if (!email && !phone) return sendError("Email or phone is required", 400);
    if (!full_name) return sendError("Full name is required", 400);
    if (!password) return sendError("Password is required", 400);
    const existingUser = await user.findOne(email ? { email } : { phone });
    if (existingUser) {
      return sendError("User already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      full_name,
      email,
      phone,
      role: role || "user",
      location,
      password: hashedPassword,
    });
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser._id,
          full_name: newUser.full_name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return sendError(message, 500);
  }
}
