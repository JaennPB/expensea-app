import React from "react";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "native-base";

interface Props {
  children: React.ReactNode;
}

const CustomKeyboardAV: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      flex={1}
      bg="darkBlue.800"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAV;
