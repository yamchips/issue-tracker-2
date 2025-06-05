"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export const statuses: Status[] = Object.values(Status);

const StatusSelector = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const changeStatus = (val: string) => {
    axios
      .patch("/api/issues/" + issue.id, { status: val })
      .then(() => router.refresh())
      .catch(() => toast.error("Changes cannot be saved."));
  };
  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
        <Select.Trigger />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status} value={status}>
              {status}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelector;
