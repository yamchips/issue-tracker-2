import LatestIssue from "./LatestIssue";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const openNum = await prisma.issue.count({ where: { status: Status.OPEN } });
  const closedNum = await prisma.issue.count({
    where: { status: Status.CLOSED },
  });
  const inProgressNum = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          openNum={openNum}
          closedNum={closedNum}
          inProgressNum={inProgressNum}
        />
        <IssueChart
          openNum={openNum}
          closedNum={closedNum}
          inProgressNum={inProgressNum}
        />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const dynamic = "force-dynamic";
