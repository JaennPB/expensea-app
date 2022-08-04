import { Heading, Box } from "native-base";

import Animated, {
  Layout,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

interface Props {
  date: string;
}

const DateItem: React.FC<Props> = ({ date }) => {
  return (
    <Animated.View
      exiting={SlideOutLeft}
      entering={SlideInRight}
      layout={Layout.delay(100)}
    >
      <Box
        bg="darkBlue.600"
        borderRadius={5}
        pb={2}
        pt={3}
        px={5}
        mb={5}
        justifyContent="center"
      >
        <Heading
          color="white"
          fontSize={20}
          fontWeight="normal"
          fontFamily="Poppins_400Regular"
        >
          {date}
        </Heading>
      </Box>
    </Animated.View>
  );
};

export default DateItem;
