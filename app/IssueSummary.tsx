import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  openNum: number;
  closedNum: number;
  inProgressNum: number;
}

const IssueSummary = ({ openNum, closedNum, inProgressNum }: Props) => {
  const cards: { name: string; value: number; status: Status }[] = [
    { name: "Open Issues", value: openNum, status: Status.OPEN },
    {
      name: "In-progress Issues",
      value: inProgressNum,
      status: Status.IN_PROGRESS,
    },
    { name: "Closed Issues", value: closedNum, status: Status.CLOSED },
  ];
  return (
    <Flex gap="4">
      {cards.map((card) => (
        <Card key={card.name}>
          <Flex direction="column" gap="1">
            <Link
              href={"/issues/list/?status=" + card.status}
              className="text-sm font-medium"
            >
              {card.name}
            </Link>
            <Text size="5" className="font-bold">
              {card.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
