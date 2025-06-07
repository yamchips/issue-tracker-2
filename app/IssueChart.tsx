"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface Props {
  openNum: number;
  closedNum: number;
  inProgressNum: number;
}

const IssueChart = ({ openNum, closedNum, inProgressNum }: Props) => {
  const data = [
    { name: "Open", value: openNum },
    { name: "Closed", value: closedNum },
    { name: "In Progress", value: inProgressNum },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize="60"
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
