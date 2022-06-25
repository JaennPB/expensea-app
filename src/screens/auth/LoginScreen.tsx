import React from "react";
import { Text, Flex, VStack, Center, Heading, Button } from "native-base";

import CustomInput from "../../components/UI/CustomInput";

const LoginScreen: React.FC = () => {
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
            Login
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
          <Button bg="darkBlue.500">Login</Button>
        </VStack>
      </Center>
    </Flex>
  );
};

export default LoginScreen;
