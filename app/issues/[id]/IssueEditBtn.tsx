import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const IssueEditBtn = ({ issue }: { issue: Issue }) => {
  return (
    <Button asChild>
      <Link href={`/issues/edit/${issue.id}`}>
        <FaPencilAlt />
        Edit Issue
      </Link>
    </Button>
  );
};

export default IssueEditBtn;
