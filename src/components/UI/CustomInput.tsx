import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { Input } from "native-base";

interface Props {
  title: string;
  type: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  value: string;
}

const CustomInput: React.FC<Props> = ({ onChangeText, title, type, value }) => {
  return (
    <Input
      placeholder={title}
      variant="filled"
      size="2xl"
      p={5}
      fontSize="xl"
      color="white"
      placeholderTextColor="darkBlue.500"
      selectionColor="darkBlue.500"
      keyboardType={type}
      backgroundColor="darkBlue.600"
      borderWidth={0}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="sentences"
    />
  );
};

export default CustomInput;
