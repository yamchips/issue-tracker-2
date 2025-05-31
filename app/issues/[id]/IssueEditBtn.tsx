import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const IssueEditBtn = ({ issue }: { issue: Issue }) => {
  return (
    <Link href={`/issues/edit/${issue.id}`}>
      <Button className="max-w-[200px]">
        <FaPencilAlt />
        Edit Issue
      </Button>
    </Link>
  );
};

export default IssueEditBtn;
