import React from "react";
import { StyleSheet } from "react-native";
import { Heading } from "native-base";

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
      style={styles.container}
      exiting={SlideOutLeft}
      entering={SlideInRight}
      layout={Layout.delay(100)}
    >
      <Heading color="white" fontSize={20} fontWeight="semibold">
        {date}
      </Heading>
    </Animated.View>
  );
};

export default DateItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#005db4",
    borderRadius: 5,
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginBottom: 20,
  },
});
