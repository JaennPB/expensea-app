import { Button, Divider, Heading } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { authenticate, setUsername } from "../../app/mainSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../db/firebase";

import Card from "../../components/UI/Card";
import CustomInput from "../../components/UI/CustomInput";
import CustomKeyboardAV from "../../components/UI/CustomKeyboardAV";

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPassworIsInvalid] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function dataEnteredHandler(inputIdentifier: string, enteredText: string) {
    setData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  // FIXME: fix try catch blocks (do not nest)
  async function logInUser() {
    try {
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userId = response.user.uid;

      const docResponse = await getDoc(doc(db, "users", userId));
      const currUsernameFromDb = docResponse.data()?.username;

      dispatch(setUsername(currUsernameFromDb));
      await AsyncStorage.setItem("usernameExpensea", currUsernameFromDb);

      setIsLoading(false);

      dispatch(authenticate(userId));
      await AsyncStorage.setItem("userIdExpensea", userId);
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
    <CustomKeyboardAV bgColor="darkBlue.800">
      <Card>
        <Heading
          color="white"
          textAlign="center"
          fontWeight="normal"
          fontFamily="Poppins_600SemiBold"
        >
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
          _text={{
            fontSize: "md",
            fontWeight: "medium",
            fontFamily: "Poppins_400Regular",
          }}
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
            fontFamily: "Poppins_400Regular",
          }}
          variant="ghost"
          onPress={() => navigation.replace("WelcomeScreen")}
        >
          Or Create Account
        </Button>
      </Card>
    </CustomKeyboardAV>
  );
};

export default LoginScreen;
