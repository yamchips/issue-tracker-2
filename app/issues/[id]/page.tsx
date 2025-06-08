import authOptions from "@/app/auth/AuthOption";
import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelector from "./AssigneeSelector";
import IssueDeleteBtn from "./IssueDeleteBtn";
import IssueDetail from "./IssueDetail";
import IssueEditBtn from "./IssueEditBtn";
import StatusSelector from "./StatusSelector";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await fetchIssue(issueId);
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Flex className="md:col-span-4" gap={"4"} direction={"column"}>
        <IssueDetail issue={issue} />
      </Flex>
      {session && (
        <Flex direction="column" gap="3" maxWidth={"200px"}>
          <AssigneeSelector issue={issue} />
          <StatusSelector issue={issue} />
          <IssueEditBtn issue={issue} />
          <IssueDeleteBtn issue={issue} />
        </Flex>
      )}
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await fetchIssue(issueId);
  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
