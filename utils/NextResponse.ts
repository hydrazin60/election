import { NextResponse } from "next/server";

export function sendError(message: string, status: number = 500): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
