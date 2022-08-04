import { useState } from "react";
import { Alert } from "react-native";
import { Heading, Button, Divider } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate, setUsername } from "../../app/mainSlice";

import { auth, db } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/react-native";
import { setDoc, doc } from "firebase/firestore";

import CustomInput from "../../components/UI/CustomInput";
import Card from "../../components/UI/Card";
import CustomKeyboardAV from "../../components/UI/CustomKeyboardAV";
import WelcomeHeading from "../../components/UI/WelcomeHeading";

const SignupScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPassworIsInvalid] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const route = useRoute<RouteProp<NavParams, "SignupScreen">>();
  const currUsernameParam = route.params.username;

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
          username: currUsernameParam,
          datesWithDataArr: [],
        });

        dispatch(setUsername(currUsernameParam));
        AsyncStorage.setItem("usernameExpensea", currUsernameParam);

        setIsLoading(false);

        dispatch(authenticate(userId));
        AsyncStorage.setItem("userIdExpensea", userId);
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
    <CustomKeyboardAV bgColor="darkBlue.800">
      <WelcomeHeading
        title={`Hello, ${currUsernameParam}!`}
        body="Please, enter your data below."
      />
      <Card>
        <Heading
          color="white"
          textAlign="center"
          fontWeight="normal"
          fontFamily="Poppins_600SemiBold"
        >
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
          _text={{ fontSize: "md", fontFamily: "Poppins_400Regular" }}
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
            fontFamily: "Poppins_400Regular",
            color: "darkBlue.500",
          }}
          variant="ghost"
          onPress={() => navigation.replace("LoginScreen")}
        >
          Or Log In
        </Button>
      </Card>
    </CustomKeyboardAV>
  );
};

export default SignupScreen;
