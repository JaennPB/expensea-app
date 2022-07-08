import React from "react";
import { StyleSheet } from "react-native";
import { Text, Box, Flex, Divider, HStack, VStack } from "native-base";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
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
  date: string;
  type: string;
}

const DataItem: React.FC<Props> = ({
  amount,
  date,
  description,
  title,
  type,
  id,
}) => {
  const translateX = useSharedValue(0);
  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value;
    })
    .onEnd(() => {
      if (translateX.value < -100) {
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
    <>
      <HiddenButtons
        translateX={translateX}
        itemId={id}
        onResetAnimation={closeSwipeAnimation}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rStyle]}>
          <VStack>
            <Text color="lightText" fontSize="20">
              {title}
            </Text>
            <HStack direction="row" alignItems="center" space={2}>
              {description != "" ? (
                <Text color="muted.300" fontSize="md">
                  {description}
                </Text>
              ) : null}
              <Box bg="darkBlue.600" px={1} borderRadius={5} mt={1}>
                <Text color="white" fontSize="xs" fontWeight="semibold">
                  {date}
                </Text>
              </Box>
            </HStack>
          </VStack>
          <Flex
            bg={type === "expense" ? "danger.400" : "tertiary.500"}
            justify="center"
            align="center"
            minW={125}
            maxW={125}
            px={5}
            py={2}
            borderRadius={5}
          >
            <Text color="white" fontSize="lg" fontWeight="semibold">
              {type === "expense" ? "-$" + amount : "$" + amount}
            </Text>
          </Flex>
        </Animated.View>
      </GestureDetector>
      <Divider my={5} thickness={1} bg="darkBlue.600" />
    </>
  );
};

export default DataItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
