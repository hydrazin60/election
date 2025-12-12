import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
// import { createDefaultAdmin } from "@/lib/createDefaultAdmin";

export async function GET() {
  try {
    await connectDB();
    // const adminMessage = await createDefaultAdmin();
    return NextResponse.json(
      { status: "ok", db: "connected" }, // message: adminMessage
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", db: "disconnected", message },
      { status: 500 }
    );
  }
}
