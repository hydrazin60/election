import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { sendError } from "@/utils/NextResponse";
import VoterSchema from "@/models/VoterSchema";
import "@/models/location";
import { getAuthenticatedStaff } from "@/middlewar/isAuthenticated";
export async function GET(
  req: Request,
  context: { params: Promise<{ voter_id: string }> }
) {
  const { voter_id } = await context.params;

  try {
    await connectDB();
    const userData = await getAuthenticatedStaff();
    if (!userData) {
      return sendError("Unauthorized", 401);
    }
    if (!voter_id) {
      return sendError("voter_id is required", 400);
    }
    const voterIdNum = Number(voter_id);
    if (isNaN(voterIdNum)) {
      return sendError("voter_id must be a valid number", 400);
    }
    const voter = await VoterSchema.findOne({ voter_id: voterIdNum }).populate(
      "location"
    );
    if (!voter) {
      return sendError("Voter not found", 404);
    }
    return NextResponse.json({ success: true, data: voter }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return sendError(message, 500);
  }
}
