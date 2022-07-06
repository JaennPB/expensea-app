import React from "react";
import { Alert } from "react-native";
import { Flex, VStack, Center, Heading, Button, Divider } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";

import { auth } from "../../db/firebase";
import {
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth/react-native";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate, setUserName } from "../../app/mainSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../db/firebase";

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = React.useState(false);
  const [passwordIsInvalid, setPassworIsInvalid] = React.useState(false);
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
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userId = response.user.uid;

      const docResponse = await getDoc(doc(db, "users", userId));
      if (docResponse.exists()) {
        const currUserName = docResponse.data().name;

        dispatch(setUserName(currUserName));
        AsyncStorage.setItem("userName", currUserName);
      }

      setIsLoading(false);

      dispatch(authenticate(userId));
      AsyncStorage.setItem("userId", userId);
    } catch (error: any) {
      let errorMessage: string;

      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email! Please try again. 📩";
        setData({ ...data, email: "" });
        setEmailIsInvalid(true);
      }
      if (error.code === "auth/wrong-password") {
        errorMessage = "Wrong password! Try again. 🔑";
        setData({ ...data, password: "" });
        setPassworIsInvalid(true);
      }
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found! Try signing up 😉";
        setData({ password: "", email: "" });
        setEmailIsInvalid(true);
      }
      Alert.alert(errorMessage!);
      setIsLoading(false);
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
            validationColor={emailIsInvalid ? "danger.400" : "darkBlue.600"}
            isInvalid={emailIsInvalid}
          />
          <CustomInput
            title="Password"
            type="default"
            onChangeText={dataEnteredHandler.bind(this, "password")}
            value={data.password}
            secureTextEntry={true}
            validationColor={passwordIsInvalid ? "danger.400" : "darkBlue.600"}
            isInvalid={passwordIsInvalid}
          />
          <Button
            bg="darkBlue.500"
            _text={{ fontSize: "md", fontWeight: "medium" }}
            onPress={logInUser}
            isLoading={isLoading}
            isLoadingText="Loggin in"
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
