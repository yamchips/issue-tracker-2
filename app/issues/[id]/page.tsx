import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetail from "./IssueDetail";
import IssueEditBtn from "./IssueEditBtn";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Flex className="md:col-span-4" gap={"4"} direction={"column"}>
        <IssueDetail issue={issue} />
      </Flex>
      <Flex direction={"column"} gap={"4"}>
        <IssueEditBtn issue={issue} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
