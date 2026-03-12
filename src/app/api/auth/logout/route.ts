import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const response = NextResponse.redirect(appUrl);

  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  return response;
}
