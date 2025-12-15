import { connectDB } from "@/lib/db";
import { getAuthenticatedStaff } from "@/middlewar/isAuthenticated";
import user from "@/models/user";
import { sendError } from "@/utils/NextResponse";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const userData = await getAuthenticatedStaff();
    if (userData.role !== "admin") {
      return sendError("unautherized access", 400);
    }
    const employList = await user.find().populate("location");
    return NextResponse.json(
      { success: true, data: employList },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("Internal Server Error");
    return sendError("Internal Server error", 500);
  }
}
