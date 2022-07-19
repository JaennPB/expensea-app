import React from "react";
import { Alert } from "react-native";
import {
  Flex,
  Box,
  Button,
  Center,
  VStack,
  Divider,
  Text,
  Heading,
  Spinner,
  HStack,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout, resetData } from "../app/mainSlice";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "../db/firebase";

import DeleteAccModal from "../components/DeleteAccModal";
import CustomInput from "../components/UI/CustomInput";

const AccountScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const currUserDocId = useAppSelector((state) => state.userId);
  const currUserDocsArray = useAppSelector((state) => state.dataArr);

  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function logoutHandler() {
    dispatch(logout());
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userName");
  }

  function cancelUserDeletionHandler() {
    setModalIsVisible(false);
    setEmailValue("");
    setPasswordValue("");
  }

  async function deleteDocsHandler() {
    let dataIds: string[] = [];

    currUserDocsArray.forEach((doc) => dataIds.push(doc.id));

    dataIds.forEach((element) => {
      async function deleteDataDocs() {
        await deleteDoc(doc(db, "users", currUserDocId, "data", element));
      }

      deleteDataDocs();
    });

    await updateDoc(doc(db, "users", currUserDocId), {
      datesWithDataArr: [],
    });
  }

  async function deleteUserDocsAndData() {
    await deleteDocsHandler();
    await deleteDoc(doc(db, "users", currUserDocId));
  }

  async function resetDataHandler(): Promise<void> {
    if (currUserDocsArray.length === 0) {
      Alert.alert("No data to delete!", "Please add some data");
      return;
    }

    await deleteDocsHandler();
    dispatch(resetData());

    navigation.navigate("AllDataScreen");
    Alert.alert("Data reset! ✅");
  }

  function getUserCredentials() {
    setModalIsVisible(true);

    const auth = getAuth();
    const user = auth.currentUser!;

    setEmailValue(user?.email!);
  }

  async function confirmUserDeletionHandler() {
    const auth = getAuth();
    const user = auth.currentUser!;

    try {
      setIsLoading(true);
      const credentials = EmailAuthProvider.credential(
        emailValue,
        passwordValue
      );

      const respose = await reauthenticateWithCredential(user, credentials);

      if (respose) {
        await deleteUserDocsAndData();
        await deleteUser(user);
        setModalIsVisible(false);
        setIsLoading(false);

        logoutHandler();
      }
    } catch {
      Alert.alert("Wrong password!", "Please try again.");
      setIsLoading(false);
      cancelUserDeletionHandler();
      return;
    }
  }

  return (
    <>
      {isLoading && (
        <Flex bg="darkBlue.700" flex={1}>
          <HStack space={2} justifyContent="center" mt={100}>
            <Spinner accessibilityLabel="Deleting data" color="white" />
            <Heading color="white" fontSize="lg">
              Deleting user...
            </Heading>
          </HStack>
        </Flex>
      )}
      {!isLoading && (
        <>
          <DeleteAccModal
            isOpen={modalIsVisible}
            onCancel={cancelUserDeletionHandler}
            onConfirm={confirmUserDeletionHandler}
            email={emailValue}
            onChangeText={(password) => setPasswordValue(password)}
            value={passwordValue}
          />
          <Flex bg="darkBlue.700" flex={1}>
            <VStack space={5} w="100%" p={5}>
              <Button
                bg="darkBlue.500"
                _text={{ fontSize: "md", fontWeight: "medium" }}
                onPress={resetDataHandler}
                isLoading={isLoading}
                isLoadingText="Deleting"
                _pressed={{ backgroundColor: "darkBlue.600" }}
              >
                Reset Data
              </Button>
              <Button
                bg="darkBlue.500"
                _text={{ fontSize: "md", fontWeight: "medium" }}
                onPress={getUserCredentials}
                _pressed={{ backgroundColor: "darkBlue.600" }}
              >
                Delete Account
              </Button>
              <Divider thickness={1} bg="darkBlue.600" />
              <Button
                bg="danger.400"
                _text={{ fontSize: "md", fontWeight: "medium" }}
                onPress={logoutHandler}
                _pressed={{ backgroundColor: "danger.500" }}
              >
                Log Out
              </Button>
            </VStack>
          </Flex>
        </>
      )}
    </>
  );
};

export default AccountScreen;
