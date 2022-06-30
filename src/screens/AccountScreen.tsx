import React from "react";
import { Flex, Box, Heading, Button } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../app/mainSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  function logoutHandler(): void {
    dispatch(logout());
    AsyncStorage.removeItem("userId");
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Account",
      headerBackVisible: false,
      headerRight: () => (
        <Button
          variant="ghost"
          _text={{
            color: "danger.400",
            fontSize: "md",
            fontWeight: "medium",
          }}
          size="lg"
          onPress={logoutHandler}
        >
          Log out
        </Button>
      ),
    });
  }, []);

  return <Flex bg="darkBlue.800" flex={1} pt={20}></Flex>;
};

export default AccountScreen;
