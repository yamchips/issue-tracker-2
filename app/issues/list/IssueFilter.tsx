"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import statuses from "../_components/Statuses";

const categories: { name: string; value: Status | "all" }[] = [
  { name: "All", value: "all" },
  { name: "Open", value: Status.OPEN },
  { name: "Closed", value: Status.CLOSED },
  { name: "In progress", value: Status.IN_PROGRESS },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateURL = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (statuses.includes(status as Status)) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    if (params.size === 0) {
      router.push("/issues/list");
    } else {
      router.push("/issues/list?" + params.toString());
    }
  };

  return (
    <Select.Root
      value={searchParams.get("status") || "all"}
      onValueChange={updateURL}
    >
      <Select.Trigger placeholder="Filter issues by ..." />
      <Select.Content>
        {categories.map((category) => (
          <Select.Item key={category.name} value={category.value}>
            {category.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
