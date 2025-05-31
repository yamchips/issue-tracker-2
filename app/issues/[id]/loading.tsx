import { Skeleton } from "@/app/components";
import { Flex, Grid } from "@radix-ui/themes";

const loading = () => {
  return (
    <Grid columns={"5"} gap="3">
      <Flex className="max-w-xl col-span-4" direction="column" gap="3">
        <Skeleton />
        <Flex gap="3" align="center">
          <Skeleton width={"3rem"} />
          <Skeleton width={"8rem"} />
        </Flex>

        <Skeleton height={"20rem"} />
      </Flex>
    </Grid>
  );
};

export default loading;
