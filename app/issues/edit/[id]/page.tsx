import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueEditPage = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
