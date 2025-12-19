import { connectDB } from "@/lib/db";
import { getAuthenticatedStaff } from "@/middlewar/isAuthenticated";
import VoterSchema from "@/models/VoterSchema";
import { sendError } from "@/utils/NextResponse";
import { NextResponse } from "next/server";
import "@/models/location";
import { englishToNepali } from "@/utils/englishToNepali";

function isEnglish(text: string) {
  return /^[a-zA-Z\s]+$/.test(text);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ full_name: string }> }
) {
  try {
    const { full_name } = await context.params;
    if (!full_name) return sendError("Full name required", 400);

    await connectDB();
    const user = await getAuthenticatedStaff();
    if (!user) return sendError("Unauthorized", 401);

    /** 🔹 Pagination params */
    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);
    const skip = (page - 1) * limit;

    let searchText = decodeURIComponent(full_name.trim());

    /** 🔹 English → Nepali */
    if (isEnglish(searchText)) {
      searchText = englishToNepali(searchText);
    }

    const parts = searchText.split(/\s+/);

    /** 🔹 Broad DB match */
    const voters = await VoterSchema.find({
      $or: parts.map((p: string) => ({
        full_name: { $regex: p, $options: "i" },
      })),
    }).populate("location");

    if (!voters.length) return sendError("Voter not found", 404);

    const scored = voters.map((v) => {
      let score = 0;
      const name = v.full_name.trim();
      const vp = name.split(/\s+/);

      if (name === searchText) score += 1000;

      if (name.startsWith(searchText)) score += 600;

      parts.forEach((p, i) => {
        if (vp[i] === p) score += 200;
        else if (vp.includes(p)) score += 100;
      });

      const lengthDiff = Math.abs(name.length - searchText.length);
      score += Math.max(0, 50 - lengthDiff);

      return { voter: v, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const total = scored.length;
    const paginated = scored.slice(skip, skip + limit).map((s) => s.voter);

    return NextResponse.json(
      {
        success: true,
        translated: searchText,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: skip + limit < total,
          hasPrev: page > 1,
        },
        data: paginated,
      },
      { status: 200 }
    );
  } catch (e) {
    return sendError(e instanceof Error ? e.message : "Server Error", 500);
  }
}
