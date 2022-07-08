import React from "react";
import { Text, Flex } from "native-base";

interface Props {
  title: string;
  data: string;
  color: "darkBlue.600" | "darkBlue.700" | "danger.400" | "tertiary.500";
  dataColorType: "danger.400" | "tertiary.500" | "white";
}

const InfoBox: React.FC<Props> = ({ color, data, title, dataColorType }) => {
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
      <Text color="white" fontSize={20}>
        {title}
      </Text>
      <Text color={dataColorType} fontSize="lg">
        {data}
      </Text>
    </Flex>
  );
};

export default InfoBox;
