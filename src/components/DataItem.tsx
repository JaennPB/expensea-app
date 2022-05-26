import { Text, Box, Flex, Divider } from "native-base";
import React from "react";

interface Props {
  title: string;
  amount: number;
  date: Date;
  type: string;
}

const DataItem: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Flex flexDir="row" justify="space-between" borderRadius={5}>
        <Box>
          <Text color="lightText" fontSize="lg">
            {props.title}
          </Text>
          <Text color="muted.300" fontSize="xs">
            {props.date.toDateString()}
          </Text>
        </Box>
        <Flex
          bg={props.type === "income" ? "success.500" : "error.400"}
          justify="center"
          align="center"
          w={100}
          borderRadius={5}
        >
          <Text color="white" fontSize="md">
            {props.type === "expense"
              ? "-$" + props.amount
              : "$" + props.amount}
          </Text>
        </Flex>
      </Flex>
      <Divider my={5} thickness={1} bg="darkBlue.600" />
    </>
  );
};

export default DataItem;
