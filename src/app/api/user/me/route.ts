import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchCurrentUser } from "@/lib/fanvue";

export async function GET(_request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await fetchCurrentUser(accessToken);
    return NextResponse.json(user);
  } catch (err) {
    console.error("Fetch user error:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
