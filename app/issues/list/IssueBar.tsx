import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueFilter from "./IssueFilter";

const IssueBar = () => {
  return (
    <Flex justify={"between"} className="mb-5">
      <IssueFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueBar;
