import React from "react";
import { Alert } from "react-native";
import {
  Flex,
  VStack,
  Center,
  Heading,
  Button,
  Divider,
  Text,
} from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";
import { useAppRoute } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";

import { auth, db } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/react-native";
import { setDoc, doc } from "firebase/firestore";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate } from "../../app/mainSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen: React.FC = () => {
  const route = useAppRoute();
  const dispatch = useAppDispatch();
  const currUserName = route.params.name;
  const navigation = useAppNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    password2: "",
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

  async function signUpHandler(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password2
      );
      const userId = response.user.uid;

      await setDoc(doc(db, "users", userId), {
        name: currUserName,
      });
      setIsLoading(false);

      dispatch(authenticate(userId));

      AsyncStorage.setItem("userId", userId);
    } catch {
      Alert.alert(
        "Please verify your credentials",
        "User may already exist 🤯"
      );
    }
  }

  return (
    <Flex bg="darkBlue.800" flex={1} pt={20}>
      <Center>
        <Heading color="white" textAlign="center" mb={5}>
          Hello! {currUserName}.
        </Heading>
        <Text color="white" mb={5}>
          Please enter your data below
        </Text>

        <VStack w="80%" bg="darkBlue.700" p={5} space={5} borderRadius={5}>
          <Heading color="white" textAlign="center">
            Sign Up
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
          <CustomInput
            title="Confirm password"
            type="default"
            onChangeText={dataEnteredHandler.bind(this, "password2")}
            value={data.password2}
            secureTextEntry={true}
          />
          <Button
            _text={{ fontSize: "md", fontWeight: "medium" }}
            bg="darkBlue.500"
            onPress={signUpHandler}
            isLoading={isLoading}
            isLoadingText="Signing up"
          >
            Sign me up!
          </Button>
          <Divider thickness={1} bg="darkBlue.600" />
          <Button
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "darkBlue.500",
            }}
            variant="ghost"
            onPress={() => navigation.replace("LoginScreen")}
          >
            Or Log In
          </Button>
        </VStack>
      </Center>
    </Flex>
  );
};

export default SignupScreen;
