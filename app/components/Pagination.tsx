"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPage: number;
}

const Pagination = ({ currentPage, totalPage }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  if (totalPage === 1) return null;

  const changePage = (page: number) => {
    const newQuery = new URLSearchParams(searchParams);
    newQuery.set("page", page.toString());
    router.push("?" + newQuery.toString());
  };

  return (
    <Flex gap={"2"} mt={"3"} align={"center"}>
      <Text size="2">
        Page {currentPage} of {totalPage}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPage}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPage}
        onClick={() => changePage(totalPage)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
