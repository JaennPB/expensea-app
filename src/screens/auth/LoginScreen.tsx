import React from "react";
import { Alert } from "react-native";
import { Flex, VStack, Center, Heading, Button, Divider } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";

import { auth } from "../../db/firebase";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate } from "../../app/mainSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function dataEnteredHandler(
    inputIdentifier: string,
    enteredText: string
  ): void {
    setData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  async function logInUser(): Promise<void> {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userId = response.user.uid;

      dispatch(authenticate(userId));

      AsyncStorage.setItem("userId", userId);
    } catch {
      Alert.alert(
        "Please verify your credentials",
        "Wrong email or password 🤯"
      );
    }
  }

  return (
    <Flex bg="darkBlue.800" flex={1} pt={20}>
      <Center>
        <VStack w="80%" bg="darkBlue.700" p={5} space={5} borderRadius={5}>
          <Heading color="white" textAlign="center">
            Log In
          </Heading>
          <CustomInput
            title="E-mail"
            type="email-address"
            onChangeText={dataEnteredHandler.bind(this, "email")}
            value={data.email}
          />
          <CustomInput
            title="Password"
            type="default"
            onChangeText={dataEnteredHandler.bind(this, "password")}
            value={data.password}
            secureTextEntry={true}
          />
          <Button
            bg="darkBlue.500"
            _text={{ fontSize: "md", fontWeight: "medium" }}
            onPress={logInUser}
          >
            Login
          </Button>
          <Divider thickness={1} bg="darkBlue.600" />
          <Button
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "darkBlue.500",
            }}
            variant="ghost"
            onPress={() => navigation.replace("WelcomeScreen")}
          >
            Or Create Account
          </Button>
        </VStack>
      </Center>
    </Flex>
  );
};

export default LoginScreen;
