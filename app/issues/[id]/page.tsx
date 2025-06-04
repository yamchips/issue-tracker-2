import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetail from "./IssueDetail";
import IssueEditBtn from "./IssueEditBtn";
import IssueDeleteBtn from "./IssueDeleteBtn";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOption";
import AssigneeSelector from "./AssigneeSelector";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Flex className="md:col-span-4" gap={"4"} direction={"column"}>
        <IssueDetail issue={issue} />
      </Flex>
      {session && (
        <Flex direction="column" gap="3" maxWidth={"200px"}>
          <AssigneeSelector issue={issue} />
          <IssueEditBtn issue={issue} />
          <IssueDeleteBtn issue={issue} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
