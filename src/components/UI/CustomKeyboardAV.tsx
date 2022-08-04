import { KeyboardAvoidingView } from "native-base";
import { Platform } from "react-native";

interface Props {
  children: React.ReactNode;
  bgColor?: "darkBlue.800" | null;
}

const CustomKeyboardAV: React.FC<Props> = ({ children, bgColor }) => {
  return (
    <KeyboardAvoidingView
      flex={1}
      bg={bgColor}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAV;
