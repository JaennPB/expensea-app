import { Text, Box, Flex } from "native-base";
import React from "react";

interface Props {
  title: string;
  amount: number;
  date: Date;
  type: string;
}

const DataItem: React.FC<Props> = (props: Props) => {
  return (
    <Flex
      flexDir="row"
      justify="space-between"
      bg="primary.700"
      mb={2}
      py={2}
      px={5}
      borderRadius={5}
    >
      <Box>
        <Text color="white">{props.title}</Text>
        <Text color="white">{props.date.toDateString()}</Text>
      </Box>
      <Flex
        bg={props.type === "income" ? "success.400" : "error.400"}
        justify="center"
        align="center"
        w={100}
        borderRadius={5}
      >
        <Text color="white">
          {props.type === "expense" ? "-$" + props.amount : "$" + props.amount}
        </Text>
      </Flex>
    </Flex>
  );
};

export default DataItem;
