import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { Input } from "native-base";

interface Props {
  title: string;
  type: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  value: string;
}

const CustomInput: React.FC<Props> = (props: Props) => {
  return (
    <Input
      placeholder={props.title}
      variant="filled"
      size="2xl"
      color="white"
      placeholderTextColor="darkBlue.500"
      selectionColor="darkBlue.500"
      keyboardType={props.type}
      backgroundColor="darkBlue.600"
      borderWidth={0}
      onChangeText={props.onChangeText}
      value={props.value}
      autoCapitalize="sentences"
    />
  );
};

export default CustomInput;
