import React from "react";
import { Alert, Platform } from "react-native";
import {
  Flex,
  VStack,
  Center,
  Heading,
  Button,
  Divider,
  Text,
  KeyboardAvoidingView,
} from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";
import { useAppRoute } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";

import { auth, db } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/react-native";
import { setDoc, doc } from "firebase/firestore";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate, setUserName } from "../../app/mainSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen: React.FC = () => {
  const route = useAppRoute();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = React.useState(false);
  const [passwordIsInvalid, setPassworIsInvalid] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    password2: "",
  });

  const currUserName = route.params.name;

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
      if (data.password === data.password2) {
        const response = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password2
        );
        const userId = response.user.uid;
        await setDoc(doc(db, "users", userId), {
          name: currUserName,
        });
        dispatch(setUserName(currUserName));
        AsyncStorage.setItem("userName", currUserName);

        setIsLoading(false);

        dispatch(authenticate(userId));
        AsyncStorage.setItem("userId", userId);
      }

      if (data.password != data.password2) {
        Alert.alert("Passwords don't match! 🔑");
        setPassworIsInvalid(true);
        setIsLoading(false);
        return;
      }
    } catch (error: any) {
      let errorMessage1: string;
      let errorMessage2: string;

      if (error.code === "auth/invalid-email") {
        errorMessage1 = "Invalid email!";
        errorMessage2 = "Please try again. 📩";
        setData({ ...data, email: "" });
        setEmailIsInvalid(true);
      }
      if (error.code === "auth/weak-password") {
        errorMessage1 = "Password must be at least 6 characters! ";
        errorMessage2 = "Please try again. 🔑";
        setData({ ...data, password: "", password2: "" });
        setPassworIsInvalid(true);
      }
      if (error.code === "auth/email-already-in-use") {
        errorMessage1 = "Email already in use";
        errorMessage2 = "Please try a diferent one! 🤯";
        setData({ ...data, email: "" });
        setEmailIsInvalid(true);
      }
      Alert.alert(errorMessage1!, errorMessage2!);
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      bg="darkBlue.800"
      flex={1}
      pt={Platform.OS === "ios" ? 20 : 10}
    >
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
          <CustomInput
            title="Confirm password"
            type="default"
            onChangeText={dataEnteredHandler.bind(this, "password2")}
            value={data.password2}
            secureTextEntry={true}
            validationColor={passwordIsInvalid ? "danger.400" : "darkBlue.600"}
            isInvalid={passwordIsInvalid}
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
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
