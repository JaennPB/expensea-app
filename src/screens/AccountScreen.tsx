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
import { deleteDoc, doc } from "firebase/firestore";
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  EmailAuthCredential,
  User,
} from "firebase/auth";

import { db } from "../db/firebase";
import { Alert } from "react-native";

import ModalCard from "../components/ModalCard";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const currUserDocId = useAppSelector((state) => state.userId);
  const currUserDocsArray = useAppSelector((state) => state.dataArr);
  const [modalIsVisible, setModalIsVisible] = React.useState(false);

  async function logoutHandler(): Promise<void> {
    dispatch(logout());
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userName");
  }

  async function resetDataHandler(type: "normal" | "hard"): Promise<void> {
    const dataIds: string[] = [];

    currUserDocsArray.forEach((doc) => dataIds.push(doc.id));
    dataIds.forEach((element) => {
      async function deleteDataDocs() {
        await deleteDoc(doc(db, "users", currUserDocId, "data", element));
      }

      deleteDataDocs();
    });

    if (type === "hard") {
      async function deleteUserDoc() {
        await deleteDoc(doc(db, "users", currUserDocId));
      }

      deleteUserDoc();
    }

    if (type === "normal") {
      dispatch(resetData());
      navigation.navigate("AllDataScreen");
      Alert.alert("Data reset! ✅");
    }
  }

  async function getUserCredentials() {
    await resetDataHandler("hard");

    const auth = getAuth();
    const user = auth.currentUser;

    const userEmail = user?.email!;

    setModalIsVisible(true);
    const userPassword = "123456";

    // only trigger on button press
    // maybe save data on state?
    confirmUserDeletionHandler(
      user!,
      EmailAuthProvider.credential(userEmail, userPassword)
    );
  }

  async function confirmUserDeletionHandler(
    user: User,
    credentials: EmailAuthCredential
  ) {
    await reauthenticateWithCredential(user, credentials);
    await deleteUser(user);
    logoutHandler();
  }

  return (
    <>
      <ModalCard isOpen={modalIsVisible} title="Credentials"></ModalCard>
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
                onPress={resetDataHandler.bind(this, "normal")}
              >
                Reset Data
              </Button>
              <Button
                bg="darkBlue.500"
                _text={{ fontSize: "md", fontWeight: "medium" }}
                onPress={getUserCredentials}
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
    </>
  );
};

export default AccountScreen;
