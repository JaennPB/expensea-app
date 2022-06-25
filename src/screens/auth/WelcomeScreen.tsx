import React from "react";
import { Flex, Heading, Center, Text, VStack, Button } from "native-base";

import CustomInput from "../../components/UI/CustomInput";

import { useAppNavigation } from "../../hooks/navigationHooks";

const WelcomeScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [name, setName] = React.useState<string>();

  function setNameAndNavigateHandler(): void {
    navigation.navigate("SignupScreen", { name: name! });
  }

  return (
    <Flex bg="darkBlue.800" flex={1} pt={20}>
      <Center>
        <Heading color="white" size="xl" mb={5}>
          Welcome to Expensea!
        </Heading>
        <Text color="white">Your to-go money tracker.</Text>
        <Text color="white">Simple. Minimalistic.</Text>
        <VStack
          bg="darkBlue.700"
          borderRadius={5}
          py={5}
          px={9}
          mt={20}
          space={10}
          w="80%"
        >
          <Heading color="white" size="md">
            How would you like to be called?
          </Heading>
          <CustomInput
            title="Name"
            type="default"
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <Button
            _text={{ fontSize: "md", fontWeight: "medium" }}
            bg="darkBlue.500"
            onPress={setNameAndNavigateHandler}
          >
            Let's go!
          </Button>
        </VStack>
      </Center>
    </Flex>
  );
};

export default WelcomeScreen;
