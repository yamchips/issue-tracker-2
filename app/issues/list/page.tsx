import { prisma } from "@/prisma/client";
import delay from "delay";
import IssueBar from "./IssueBar";
import IssueTable from "./IssueTable";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);
  return (
    <>
      <IssueBar />
      <IssueTable issues={issues} />
    </>
  );
};

export default IssuesPage;
