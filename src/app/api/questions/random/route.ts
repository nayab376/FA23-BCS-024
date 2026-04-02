import { NextResponse } from "next/server";
import { learningQuestions } from "@/lib/mock-data";

export function GET() {
  const randomQuestion =
    learningQuestions[Math.floor(Math.random() * learningQuestions.length)];

  return NextResponse.json({
    success: true,
    data: randomQuestion,
  });
}
