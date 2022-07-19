import React from "react";
import { Pressable } from "native-base";

//TODO: move out of ui folder

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { AntDesign } from "@expo/vector-icons";

const AddButton = () => {
  const navigation = useAppNavigation();

  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function openAddItemHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    navigation.navigate("ManageDataScreen", { itemIdtoEdit: null });
  }

  return (
    <Animated.View style={[rStyle]}>
      <Pressable
        _pressed={{ bg: "darkBlue.600" }}
        p={2}
        mr={5}
        borderRadius={50}
        bg="darkBlue.700"
        onPress={openAddItemHandler}
      >
        <AntDesign name="plus" size={29} color="white" />
      </Pressable>
    </Animated.View>
  );
};

export default AddButton;
