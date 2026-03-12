import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCodeVerifier, generateCodeChallenge, generateState } from "@/lib/pkce";
import { buildAuthorizationUrl } from "@/lib/fanvue";

export async function GET(): Promise<NextResponse> {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Missing CLIENT_ID or REDIRECT_URI environment variables" },
      { status: 500 }
    );
  }

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  const cookieStore = await cookies();
  cookieStore.set("code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  const authUrl = buildAuthorizationUrl({ clientId, redirectUri, codeChallenge, state });

  return NextResponse.redirect(authUrl);
}
