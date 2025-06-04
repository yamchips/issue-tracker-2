"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import { toast, Toaster } from "react-hot-toast";

const AssigneeSelector = ({ issue }: { issue: Issue }) => {
  const { data, error, isLoading } = useUsers();
  const assignUser = (val: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedUserId: val === "unassigned" ? null : val,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };
  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || "unassigned"}
        onValueChange={assignUser}
      >
        <Select.Trigger />
        <Select.Content>
          {data?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
          <Select.Item value={"unassigned"}>Unassigned</Select.Item>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelector;
