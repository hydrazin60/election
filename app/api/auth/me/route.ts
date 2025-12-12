import { sendError } from "@/utils/NextResponse";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];
    if (!token) {
      return sendError("Unauthorized", 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
      role: string;
    };
    return NextResponse.json(
      {
        user: {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}
