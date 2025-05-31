import { StatusBadge, CustomLink } from "@/app/components";
import { Issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";

const IssueTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.name}
              className={column.className}
            >
              {column.name}
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

const columns = [
  { name: "Title" },
  { name: "Status" },
  { name: "Created", className: "hidden md:table-cell" },
];

export default IssueTable;
