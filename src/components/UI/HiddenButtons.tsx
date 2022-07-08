import React from "react";
import { StyleSheet } from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  translateX: Animated.SharedValue<number>;
}

const HiddenButtons: React.FC<Props> = ({ translateX }) => {
  const inputRange = [0, -100];

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, inputRange, [0, 1]);
    const scale = interpolate(translateX.value, inputRange, [0, 1]);
    const right = interpolate(translateX.value, inputRange, [-20, 0]);

    return {
      opacity: opacity,
      transform: [{ scale: withSpring(scale) }],
      right: right + "%",
    };
  });

  return (
    <Animated.View style={[styles.buttonsContainer, rStyle]}>
      <MaterialIcons name="edit" size={30} color="#0077e6" />
      <FontAwesome5 name="trash" size={25} color="#fb7185" />
    </Animated.View>
  );
};

export default HiddenButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    position: "absolute",
    right: "0%",
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
});
