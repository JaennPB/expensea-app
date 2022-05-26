import { Text, Box, Flex } from "native-base";
import React from "react";

interface Props {
  type: string;
  data: string | number;
  color: "success.500" | "error.400";
}

const InfoBox: React.FC<Props> = (props: Props) => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      px={5}
      py={2}
      bg={props.color}
      borderRadius={5}
    >
      <Text color="white" fontSize="md">
        {props.type}
      </Text>
      <Text color="white" fontSize="md">
        {props.data}
      </Text>
    </Flex>
  );
};

export default InfoBox;
