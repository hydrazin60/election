import { connectDB } from "@/lib/db";
import { getAuthenticatedStaff } from "@/middlewar/isAuthenticated";
import VoterSchema from "@/models/VoterSchema";
import { sendError } from "@/utils/NextResponse";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const userData = await getAuthenticatedStaff();
    if (!userData) {
      return sendError("Unauthorized", 401);
    }
    const {
      province,
      district,
      municipality,
      wardNumber,
      pollingCenter,
      hoRConstituency,
      provincialConstituency,
    } = req.body ? await req.json() : {};
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 100;
    const skip = (page - 1) * limit;
    const voters = await VoterSchema.find()
      .populate("location")
      .skip(skip)
      .limit(limit)
      .sort({ serial_no: 1 });

    const total = await VoterSchema.countDocuments();

    return NextResponse.json(
      {
        success: true,
        data: voters,
        pagination: {
          page,
          limit,
          total,
          hasMore: skip + voters.length < total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return sendError(message, 500);
  }
}
