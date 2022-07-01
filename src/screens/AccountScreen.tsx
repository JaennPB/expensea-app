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

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useAppNavigation } from "../hooks/navigationHooks";
import { logout, resetData } from "../app/mainSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";

import { db } from "../db/firebase";
import { Alert } from "react-native";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const currUserDocId = useAppSelector((state) => state.userId);
  const currUserDocsArray = useAppSelector((state) => state.dataArr);
  const [isLoading, setIsloading] = React.useState(false);

  function logoutHandler(): void {
    dispatch(logout());
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userName");
  }

  async function resetDataHandler(): Promise<void> {
    const dataIds: string[] = [];

    if (currUserDocsArray.length === 0) {
      Alert.alert("No data to delete! ❌");
      return;
    }

    setIsloading(true);

    currUserDocsArray.forEach((doc) => dataIds.push(doc.id));

    dataIds.forEach((element) => {
      async function deleteData() {
        await deleteDoc(doc(db, "users", currUserDocId, "data", element));
      }

      deleteData();
    });

    setIsloading(false);

    dispatch(resetData());
    navigation.navigate("AllDataScreen");
    Alert.alert("Data reset! ✔");
  }

  function deleteAccountHandler(): void {
    // TODO:
    //re-authenticate
    //delete data
    //add a "are you sure" prompt

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      deleteUser(user).then(() => {
        dispatch(logout());
      });
    }
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
              onPress={resetDataHandler}
              isLoading={isLoading}
              isLoadingText="Deleting"
            >
              Reset Data
            </Button>
            <Button
              bg="darkBlue.500"
              _text={{ fontSize: "md", fontWeight: "medium" }}
              onPress={deleteAccountHandler}
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
