import React from "react";
import { Text, Flex } from "native-base";

interface Props {
  title: string;
  data: string;
  color: "danger.400" | "tertiary.500" | "darkBlue.600" | "darkBlue.700";
}

const InfoBox: React.FC<Props> = ({ color, data, title }) => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      px={5}
      py={2}
      bg={color}
      borderRadius={5}
    >
      <Text color="white" fontSize="lg">
        {title}
      </Text>
      <Text color="white" fontSize="lg">
        {data}
      </Text>
    </Flex>
  );
};

export default InfoBox;
