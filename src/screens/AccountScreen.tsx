import React from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Center,
  VStack,
  Divider,
} from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../app/mainSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  function logoutHandler(): void {
    dispatch(logout());
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userName");
  }

  return (
    <Flex bg="darkBlue.700" flex={1} pt={5}>
      <Center>
        <Box bg="darkBlue.800" p={5} borderRadius={5} w="80%">
          <Heading color="white" mb={5}>
            Settings
          </Heading>
          <VStack space={5}>
            <Button
              bg="darkBlue.500"
              _text={{ fontSize: "md", fontWeight: "medium" }}
            >
              Reset Data
            </Button>
            <Button
              bg="darkBlue.500"
              _text={{ fontSize: "md", fontWeight: "medium" }}
            >
              Delete Account
            </Button>
            <Divider thickness={1} bg="darkBlue.600" />
            <Button
              bg="danger.400"
              _text={{ fontSize: "md", fontWeight: "medium" }}
              onPress={logoutHandler}
            >
              Log Out
            </Button>
          </VStack>
        </Box>
      </Center>
    </Flex>
  );
};

export default AccountScreen;
