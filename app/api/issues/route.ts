import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issuePostSchema = z.object({
  title: z.string().min(3, { message: "title is required" }).max(255),
  description: z
    .string()
    .min(1, { message: "description is required" })
    .max(65535),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issuePostSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
