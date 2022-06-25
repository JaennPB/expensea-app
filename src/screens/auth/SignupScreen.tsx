import React from "react";
import { Flex, VStack, Center, Heading, Button, Divider } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";

const SignupScreen: React.FC = () => {
  const navigation = useAppNavigation();
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

  return (
    <Flex bg="darkBlue.800" flex={1} pt={20}>
      <Center>
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
            title="Re-enter password"
            type="default"
            onChangeText={dataEnteredHandler.bind(this, "password")}
            value={data.password}
            secureTextEntry={true}
          />
          <Button
            _text={{ fontSize: "md", fontWeight: "medium" }}
            bg="darkBlue.500"
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
