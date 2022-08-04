import { Flex, Text } from "native-base";

import Animated, { SlideInDown } from "react-native-reanimated";

interface Props {
  title: string;
  data: string;
  bgColor: "darkBlue.600" | "darkBlue.700" | "danger.400" | "tertiary.500";
  textColor: "danger.400" | "tertiary.500" | "white";
  index: number;
}

const InfoBox: React.FC<Props> = ({
  textColor,
  data,
  title,
  bgColor,
  index,
}) => {
  return (
    <Animated.View entering={SlideInDown.delay(200 * index!)}>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        px={5}
        py={2}
        bg={bgColor}
        borderRadius={5}
      >
        <Text color="white" fontSize={20} fontFamily="Poppins_400Regular">
          {title}
        </Text>
        <Text color={textColor} fontSize="lg" fontFamily="Poppins_400Regular">
          {data}
        </Text>
      </Flex>
    </Animated.View>
  );
};

export default InfoBox;
