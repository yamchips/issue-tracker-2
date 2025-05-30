import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { name: string; color: "orange" | "blue" | "green" }
> = {
  OPEN: { name: "Open", color: "blue" },
  CLOSED: { name: "Closed", color: "green" },
  IN_PROGRESS: { name: "In progress", color: "orange" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return <Badge color={statusMap[status].color}>{status}</Badge>;
};

export default StatusBadge;
