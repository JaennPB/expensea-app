import React from "react";
import { Alert, Platform } from "react-native";
import {
  VStack,
  Heading,
  Button,
  Divider,
  Text,
  KeyboardAvoidingView,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate, setUserName } from "../../app/mainSlice";

import { auth, db } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/react-native";
import { setDoc, doc } from "firebase/firestore";

import CustomInput from "../../components/UI/CustomInput";
import Card from "../../components/UI/Card";

const SignupScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "SignupScreen">>();
  const currUserName = route.params.nameFromUser;

  const [isLoading, setIsLoading] = React.useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = React.useState(false);
  const [passwordIsInvalid, setPassworIsInvalid] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    password2: "",
  });

  function dataEnteredHandler(inputIdentifier: string, enteredText: string) {
    setData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  async function signUpHandler() {
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
          userName: currUserName,
          datesWithDataArr: [],
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
      flex={1}
      bg="darkBlue.800"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      justifyContent="center"
      alignItems="center"
    >
      <VStack space={2} mb={10}>
        <Heading color="white" textAlign="center">
          Hello, {currUserName}!
        </Heading>
        <Text color="white">Please, enter your data below.</Text>
      </VStack>
      <Card>
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
          autoCapitalize="none"
        />
        <CustomInput
          title="Password"
          type="default"
          onChangeText={dataEnteredHandler.bind(this, "password")}
          value={data.password}
          secureTextEntry={true}
          validationColor={passwordIsInvalid ? "danger.400" : "darkBlue.600"}
          isInvalid={passwordIsInvalid}
          autoCapitalize="none"
        />
        <CustomInput
          title="Confirm password"
          type="default"
          onChangeText={dataEnteredHandler.bind(this, "password2")}
          value={data.password2}
          secureTextEntry={true}
          validationColor={passwordIsInvalid ? "danger.400" : "darkBlue.600"}
          isInvalid={passwordIsInvalid}
          autoCapitalize="none"
        />
        <Button
          _text={{ fontSize: "md", fontWeight: "medium" }}
          bg="darkBlue.500"
          onPress={signUpHandler}
          isLoading={isLoading}
          isLoadingText="Signing up"
          _pressed={{ backgroundColor: "darkBlue.600" }}
        >
          Sign Me Up!
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
      </Card>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
