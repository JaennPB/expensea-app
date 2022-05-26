import { Pressable } from "native-base";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

import { useAppNavigation } from "../../hooks/navigationHooks";

const AddButton: React.FC = () => {
  const navigation = useAppNavigation();

  return (
    <Pressable
      _pressed={{ bg: "darkBlue.600" }}
      px={2}
      py={2}
      mr={5}
      borderRadius={50}
      bg="darkBlue.700"
      onPress={() => navigation.navigate("AddDataPointScreen")}
    >
      <AntDesign name="plus" size={25} color="white" />
    </Pressable>
  );
};

export default AddButton;
