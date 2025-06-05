import { StatusBadge, CustomLink } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sortOrder: "asc" | "desc";
  page: string;
}

interface Props {
  issues: Issue[];
  query: IssueQuery;
}

const IssueTable = ({ issues, query }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    ...query,
                    orderBy: column.value,
                    sortOrder: query.sortOrder === "asc" ? "desc" : "asc",
                  },
                }}
              >
                {column.name}
              </Link>
              {column.value === query.orderBy && (
                <ArrowUpIcon
                  className={`inline transition-transform ${
                    query.sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <CustomLink href={"/issues/" + issue.id} name={issue.title} />
            </Table.Cell>
            <Table.Cell>
              <StatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { name: string; value: keyof Issue; className?: string }[] = [
  { name: "Title", value: "title" },
  { name: "Status", value: "status" },
  { name: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((col) => col.value);

export default IssueTable;
