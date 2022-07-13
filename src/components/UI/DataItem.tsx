import React from "react";
import { StyleSheet } from "react-native";
import { Text, Flex, Divider, HStack, VStack, View } from "native-base";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SlideInRight,
  Layout,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import HiddenButtons from "./HiddenButtons";

interface Props {
  id: string;
  title: string;
  amount: string;
  description: string;
  type: string;
  index: number;
}

const DataItem: React.FC<Props> = ({
  amount,
  description,
  title,
  type,
  id,
  index,
}) => {
  const convertedAmount = +amount;
  const translateX = useSharedValue(0);
  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value;

      if (event.translationX + context.value > 0) {
        translateX.value = 0;
      }
    })
    .onEnd(() => {
      if (translateX.value < -50) {
        translateX.value = withTiming(-100);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  function closeSwipeAnimation() {
    translateX.value = withTiming(0);
  }

  return (
    <Animated.View
      style={{ position: "relative" }}
      exiting={SlideOutLeft}
      entering={SlideInRight.delay(100 * index)}
      layout={Layout.delay(100)}
    >
      <HiddenButtons
        translateX={translateX}
        itemId={id}
        onResetAnimation={closeSwipeAnimation}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rStyle]}>
          <VStack>
            <Text color="white" fontSize="20">
              {title}
            </Text>
            <HStack direction="row" alignItems="center" space={2}>
              {description != "" ? (
                <Text color="muted.300" fontSize="md">
                  {description}
                </Text>
              ) : null}
            </HStack>
          </VStack>
          <Flex
            bg={type === "expense" ? "danger.400" : "tertiary.500"}
            justify="center"
            align="center"
            minW={130}
            maxW={130}
            py={2}
            borderRadius={5}
          >
            <Text color="white" fontSize="lg" fontWeight="semibold">
              {type === "expense"
                ? "-$" + convertedAmount.toFixed(2)
                : "$" + convertedAmount.toFixed(2)}
            </Text>
          </Flex>
        </Animated.View>
      </GestureDetector>
      <Divider my={5} thickness={1} bg="darkBlue.600" />
    </Animated.View>
  );
};

export default DataItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
});
