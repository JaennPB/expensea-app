import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { Input } from "native-base";

interface Props {
  title: string | undefined;
  type: KeyboardTypeOptions;
  value: string | undefined;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  validationColor?: "darkBlue.600" | "danger.400";
  isInvalid?: boolean;
}

const CustomInput: React.FC<Props> = ({
  onChangeText,
  title,
  type,
  value,
  secureTextEntry,
  validationColor,
  isInvalid,
}) => {
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
      secureTextEntry={secureTextEntry}
      borderColor={validationColor}
      borderBottomWidth={isInvalid ? 2 : 0}
      _focus={{ borderBottomColor: validationColor }}
      returnKeyType="done"
    />
  );
};

export default CustomInput;
