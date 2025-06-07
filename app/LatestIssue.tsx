import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { StatusBadge } from "./components";

const LatestIssue = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: {
      assignedUser: { select: { image: true } },
    },
  });

  return (
    <Card>
      <Heading mb={"3"} size={"4"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="2" align="start">
                    <Link href={"/issues/" + issue.id}>{issue.title}</Link>
                    <StatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedUser && (
                    <Avatar
                      src={issue.assignedUser?.image || "/defaultUser.png"}
                      radius="full"
                      size="2"
                      fallback={"?"}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
