import { connectDB } from "@/lib/db";
import { getAuthenticatedStaff } from "@/middlewar/isAuthenticated";
import VoterSchema from "@/models/VoterSchema";
import LocationSchema from "@/models/location";
import { sendError } from "@/utils/NextResponse";
import { NextResponse } from "next/server";

interface LocationQuery {
  province: string;
  district: string;
  municipality: string;
  wardNumber: number;
  pollingCenter: string;
}
export async function POST(req: Request) {
  try {
    await connectDB();
    const userData = await getAuthenticatedStaff();
    if (!userData) return sendError("Unauthorized", 401);

    const body = await req.json();
    const {
      province,
      district,
      municipality,
      wardNumber,
      pollingCenter,

      page = 1,
      limit = 10,
    } = body;

    if (
      !province ||
      !district ||
      !municipality ||
      !wardNumber ||
      !pollingCenter
    ) {
      return sendError(
        "All of province, district, municipality, wardNumber, and pollingCenter are required.",
        400
      );
    }

    const skip = (page - 1) * limit;

    const locationQuery: LocationQuery = {
      province: province.trim(),
      district: district.trim(),
      municipality: municipality.trim(),
      wardNumber: parseInt(wardNumber),
      pollingCenter: pollingCenter.trim(),
    };

    const matchedLocations = await LocationSchema.find({
      province: { $regex: `^${province.trim()}$`, $options: "i" },
      district: { $regex: `^${district.trim()}$`, $options: "i" },
      municipality: { $regex: `^${municipality.trim()}$`, $options: "i" },
      wardNumber: parseInt(wardNumber),
      pollingCenter: { $regex: `^${pollingCenter.trim()}$`, $options: "i" },
    }).select("_id");

    if (!matchedLocations.length)
      return sendError("No location found with these filters", 404);

    const locationIds = matchedLocations.map((l) => l._id);

    // Query voters
    const total = await VoterSchema.countDocuments({
      location: { $in: locationIds },
    });
    const voters = await VoterSchema.find({ location: { $in: locationIds } })
      .populate("location")
      .skip(skip)
      .limit(limit)
      .sort({ serial_no: 1 });

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
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return sendError(message, 500);
  }
}
