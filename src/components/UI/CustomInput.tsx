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
  maxLength?: number;
  autoCapitalize: "none" | "sentences";
}

const CustomInput: React.FC<Props> = ({
  onChangeText,
  title,
  type,
  value,
  secureTextEntry,
  validationColor,
  isInvalid,
  maxLength,
  autoCapitalize,
}) => {
  return (
    <Input
      placeholder={title}
      variant="filled"
      size="2xl"
      p={5}
      fontSize="xl"
      fontFamily="Poppins_400Regular"
      color="white"
      placeholderTextColor="darkBlue.400"
      selectionColor="darkBlue.400"
      keyboardType={type}
      backgroundColor="darkBlue.600"
      onChangeText={onChangeText}
      value={value}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      borderColor={validationColor}
      borderWidth={isInvalid ? 1 : 0}
      _focus={{
        borderColor: validationColor,
        backgroundColor: "darkBlue.500",
      }}
      returnKeyType="done"
      maxLength={maxLength}
    />
  );
};

export default CustomInput;
