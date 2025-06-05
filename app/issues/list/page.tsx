import { prisma } from "@/prisma/client";
import statuses from "../_components/Statuses";
import IssueBar from "./IssueBar";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const { status, orderBy, sortOrder } = query;
  const statusParam = statuses.includes(status) ? status : undefined;

  const orderByParam = columnNames.includes(orderBy)
    ? ["asc", "desc"].includes(sortOrder)
      ? { [orderBy]: sortOrder }
      : undefined
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: statusParam },
    orderBy: orderByParam,
  });
  return (
    <>
      <IssueBar />
      <IssueTable issues={issues} query={query} />
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
