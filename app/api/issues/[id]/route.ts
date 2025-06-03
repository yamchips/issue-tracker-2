import authOptions from "@/app/auth/AuthOption";
import { issuePostSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = issuePostSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  console.log(body.title, body.description);

  const { id } = await params;
  const issueId = parseInt(id);
  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const response = await prisma.issue.update({
    where: { id: issueId },
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(response, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const { id } = await params;
  const issueId = parseInt(id);
  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({ where: { id: issueId } });
  return NextResponse.json(deletedIssue, { status: 200 });
}
