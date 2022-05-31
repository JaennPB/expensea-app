import { Input } from "native-base";
import React from "react";

import { KeyboardTypeOptions } from "react-native";

interface Props {
  title: string;
  type: KeyboardTypeOptions;
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
    />
  );
};

export default CustomInput;
