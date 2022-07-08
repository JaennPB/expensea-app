import React from "react";
import { Pressable } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { AntDesign } from "@expo/vector-icons";

const AddButton: React.FC = () => {
  const navigation = useAppNavigation();

  return (
    <Pressable
      _pressed={{ bg: "darkBlue.600" }}
      p={2}
      mr={5}
      borderRadius={50}
      bg="darkBlue.700"
      onPress={() =>
        navigation.navigate("ManageDataScreen", { itemIdtoEdit: null })
      }
    >
      <AntDesign name="plus" size={29} color="white" />
    </Pressable>
  );
};

export default AddButton;
