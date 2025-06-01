import { prisma } from "@/prisma/client";
import IssueBar from "./IssueBar";
import IssueTable from "./IssueTable";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <IssueBar />
      <IssueTable issues={issues} />
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
