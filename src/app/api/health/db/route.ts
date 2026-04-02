import { NextResponse } from "next/server";
import { getSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase";

export async function GET() {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      {
        success: false,
        message: "Supabase environment variables are missing.",
      },
      { status: 503 },
    );
  }

  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        message: "Supabase client could not be created.",
      },
      { status: 500 },
    );
  }

  const startedAt = Date.now();
  const { error, count } = await supabase
    .from("packages")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        responseMs: Date.now() - startedAt,
        message: error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    responseMs: Date.now() - startedAt,
    packagesCount: count ?? 0,
  });
}
