import React from "react";
import { Alert, Platform } from "react-native";
import { Heading, Button, Divider, KeyboardAvoidingView } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate, setUserName } from "../../app/mainSlice";

import { auth, db } from "../../db/firebase";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import { getDoc, doc } from "firebase/firestore";

import CustomInput from "../../components/UI/CustomInput";
import Card from "../../components/UI/Card";

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
      let errorMessage1: string;
      let errorMessage2: string;

      if (error.code === "auth/invalid-email") {
        errorMessage1 = "Invalid email!";
        errorMessage2 = "Please try again. 📩";
        setData({ ...data, email: "" });
        setEmailIsInvalid(true);
      }
      if (error.code === "auth/wrong-password") {
        errorMessage1 = "Wrong password!";
        errorMessage2 = "Please try again. 🔑";
        setData({ ...data, password: "" });
        setPassworIsInvalid(true);
      }
      if (error.code === "auth/user-not-found") {
        errorMessage1 = "User not found!";
        errorMessage2 = "Please try signing up 😉";
        setData({ password: "", email: "" });
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
      <Card>
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
        <Button
          bg="darkBlue.500"
          _text={{ fontSize: "md", fontWeight: "medium" }}
          onPress={logInUser}
          isLoading={isLoading}
          isLoadingText="Logging in"
          _pressed={{ backgroundColor: "darkBlue.600" }}
        >
          Log In
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
      </Card>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
