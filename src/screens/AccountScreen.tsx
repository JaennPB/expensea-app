import React from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Center,
  VStack,
  Divider,
  Text,
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
import CustomInput from "../components/UI/CustomInput";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const currUserDocId = useAppSelector((state) => state.userId);
  const currUserDocsArray = useAppSelector((state) => state.dataArr);

  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
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
    setModalIsVisible(true);

    const auth = getAuth();
    const user = auth.currentUser!;

    setEmailValue(user?.email!);
  }

  async function confirmUserDeletionHandler() {
    const auth = getAuth();
    const user = auth.currentUser!;

    // find a way to stop data deletion if password is wrong
    try {
      const credentials = EmailAuthProvider.credential(
        emailValue,
        passwordValue
      );

      await resetDataHandler("hard");
      await reauthenticateWithCredential(user, credentials);
      await deleteUser(user);

      logoutHandler();
    } catch {
      Alert.alert("Wrong password!", "Please try again.");
    }
  }

  function cancelUserDeletionHandler() {
    setModalIsVisible(false);
    setEmailValue("");
    setPasswordValue("");
  }

  return (
    <>
      <ModalCard
        isOpen={modalIsVisible}
        title="Please type your password to delete account"
        onCancel={cancelUserDeletionHandler}
        onConfirm={confirmUserDeletionHandler}
        buttonCancel="Cancel"
        buttonConfirm="Delete"
        buttonConfirmColor="danger.400"
      >
        <Text color="white" fontSize="lg" mb={5} ml={1}>
          {emailValue}
        </Text>
        <CustomInput
          title="Password"
          type="default"
          onChangeText={(value) => setPasswordValue(value)}
          value={passwordValue}
          secureTextEntry={true}
        />
      </ModalCard>
      <Flex bg="darkBlue.700" flex={1}>
        <Center>
          <Box bg="darkBlue.700" p={5} w="90%">
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
