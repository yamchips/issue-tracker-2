import StatusBadge from "@/app/components/StatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return notFound();
  return (
    <Grid columns={"5"} gap="3">
      <Flex className="col-span-4" direction="column" gap="3">
        <Heading>{issue.title}</Heading>
        <Flex gap="3" align="center">
          <StatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Flex>
      <Flex>Edit Panel</Flex>
    </Grid>
  );
};

export default IssueDetailPage;
