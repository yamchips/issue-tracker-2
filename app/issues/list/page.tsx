import { prisma } from "@/prisma/client";
import statuses from "../_components/Statuses";
import IssueBar from "./IssueBar";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const { status, orderBy, sortOrder, page } = query;
  const statusParam = statuses.includes(status) ? status : undefined;

  const orderByParam = columnNames.includes(orderBy)
    ? ["asc", "desc"].includes(sortOrder)
      ? { [orderBy]: sortOrder }
      : undefined
    : undefined;

  const pageNum = parseInt(page) || 1;
  const pageSize = 10;
  const totalItem = await prisma.issue.count({
    where: { status: statusParam },
  });
  const totalPage = Math.ceil(totalItem / pageSize);

  const issues = await prisma.issue.findMany({
    where: { status: statusParam },
    orderBy: orderByParam,
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
  });
  return (
    <>
      <IssueBar />
      <IssueTable issues={issues} query={query} />
      <Pagination currentPage={pageNum} totalPage={totalPage} />
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
