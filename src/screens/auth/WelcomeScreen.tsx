import React from "react";
import { Alert, Platform } from "react-native";
import {
  Heading,
  Center,
  Text,
  VStack,
  Button,
  KeyboardAvoidingView,
} from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";

const WelcomeScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [name, setName] = React.useState<string>();

  function setNameAndNavigateHandler(): void {
    if (!name) {
      Alert.alert("Please add a name");
      return;
    }

    navigation.navigate("SignupScreen", { nameFromUser: name });
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      bg="darkBlue.800"
      behavior="padding"
      pt={Platform.OS === "ios" ? 20 : 10}
    >
      <Center>
        <Heading color="white" size="xl" mb={5}>
          Welcome to Expensea!
        </Heading>
        <Text color="white">Your to-go money tracker.</Text>
        <Text color="white">Simple. Minimalistic.</Text>
        <VStack
          bg="darkBlue.700"
          borderRadius={5}
          py={5}
          px={9}
          mt={10}
          space={10}
          w="80%"
        >
          <Heading color="white" size="md">
            How would you like to be called?
          </Heading>
          <CustomInput
            title="Name"
            type="default"
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <Button
            _text={{ fontSize: "md", fontWeight: "medium" }}
            bg="darkBlue.500"
            onPress={setNameAndNavigateHandler}
            _pressed={{ backgroundColor: "darkBlue.600" }}
          >
            Let's go!
          </Button>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;
