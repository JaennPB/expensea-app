import { Text, Box, Flex } from "native-base";
import React from "react";

interface Props {
  type: string;
  data: string | number;
  color: "success.400" | "error.400";
}

const InfoBox: React.FC<Props> = (props: Props) => {
  return (
    <Box px={5} py={2} bg={props.color} mb={2} borderRadius={5}>
      <Flex direction="row" justify="space-between" align="center">
        <Text color="white">{props.type}</Text>
        <Text color="white">{props.data}</Text>
      </Flex>
    </Box>
  );
};

export default InfoBox;
