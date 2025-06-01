import { Skeleton } from "@/app/components";
import { Flex } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Flex className="max-w-xl" gap={"3"}>
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
    </Flex>
  );
};

export default IssueFormSkeleton;
