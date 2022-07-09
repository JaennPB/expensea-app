import React from "react";
import { Alert, Platform } from "react-native";
import {
  Heading,
  Text,
  VStack,
  Button,
  KeyboardAvoidingView,
} from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";
import Card from "../../components/UI/Card";

const WelcomeScreen = () => {
  const navigation = useAppNavigation();

  const [name, setName] = React.useState("");

  function setNameAndNavigateHandler() {
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      justifyContent="center"
      alignItems="center"
    >
      <VStack space={2} mb={10}>
        <Heading color="white" size="xl">
          Welcome to Expensea!
        </Heading>
        <Text color="white" fontSize="md">
          Your simple and minimalistic money tracker.
        </Text>
      </VStack>
      <Card>
        <Heading color="white" size="md">
          How would you like to be called?
        </Heading>
        <CustomInput
          title="Name"
          type="default"
          onChangeText={(value) => setName(value)}
          value={name}
          autoCapitalize="sentences"
        />
        <Button
          _text={{ fontSize: "md", fontWeight: "medium" }}
          bg="darkBlue.500"
          onPress={setNameAndNavigateHandler}
          _pressed={{ backgroundColor: "darkBlue.600" }}
        >
          Confirm
        </Button>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;
