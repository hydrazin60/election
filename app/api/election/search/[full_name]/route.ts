import { connectDB } from "@/lib/db";
import { getAuthenticatedStaff } from "@/middlewar/isAuthenticated";
import VoterSchema from "@/models/VoterSchema";
import { sendError } from "@/utils/NextResponse";
import { NextResponse } from "next/server";
import "@/models/location";

export async function GET(
  req: Request,
  context: { params: Promise<{ full_name: string }> }
) {
  try {
    const { full_name } = await context.params;

    await connectDB();
    const userData = await getAuthenticatedStaff();
    if (!userData) return sendError("Unauthorized", 401);
    if (!full_name) return sendError("full name is required", 400);

    const decodedName = decodeURIComponent(full_name.trim());
    const nameParts = decodedName.split(/\s+/);

    if (nameParts.length === 0) return sendError("Invalid full name", 400);

    // Step 1: Fetch all voters containing at least one part
    const regexes = nameParts.map((part) => new RegExp(part, "i"));
    const voters = await VoterSchema.find({
      $or: regexes.map((r) => ({ full_name: r })),
    }).populate("location");

    if (!voters || voters.length === 0)
      return sendError("Voter not found", 404);

    // Step 2: Score each voter giving priority to first words
    const scored = voters.map((voter) => {
      const voterNameParts = voter.full_name.split(/\s+/);
      let score = 0;

      // Give higher weight to the first word, lower to next
      for (let i = 0; i < nameParts.length; i++) {
        const inputPart = nameParts[i];
        const weight = nameParts.length - i; // first word highest weight
        if (
          voterNameParts[i] &&
          new RegExp(inputPart, "i").test(voterNameParts[i])
        ) {
          score += weight;
        }
      }

      return { voter, score };
    });

    // Step 3: Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Step 4: Take only the **top match**
    const result = scored.length > 0 ? [scored[0].voter] : [];

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return sendError(message, 500);
  }
}
