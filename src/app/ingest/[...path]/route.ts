import type { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const body = await request.text();

  const response = await fetch(`https://us.i.posthog.com/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": request.headers.get("user-agent") || "",
    },
    body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `https://us.i.posthog.com/${path}${searchParams ? `?${searchParams}` : ""}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": request.headers.get("user-agent") || "",
    },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
