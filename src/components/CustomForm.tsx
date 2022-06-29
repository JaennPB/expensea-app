import React from "react";
import { Alert } from "react-native";
import { VStack, Flex, Button, Heading, IconButton, Icon } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { addItem, removeItem } from "../app/mainSlice";

import moment from "moment";

import CustomInput from "./UI/CustomInput";

import { Entypo } from "@expo/vector-icons";

import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";

interface Props {
  isEditing: boolean;
  itemToEditId: string;
}

const CustomForm: React.FC<Props> = ({ isEditing, itemToEditId }) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [finishedEditing, setFinishedEditing] = React.useState<boolean>(false);

  const currUserDocId = useAppSelector((state) => state.currUserDocId);

  let itemToEditData!: DataObj;
  if (isEditing) {
    const dataArr = useAppSelector((state) => state.dataArr);
    itemToEditData = dataArr.find((item) => item.id === itemToEditId)!;
  }

  const [inputData, setInputData] = React.useState({
    id: isEditing && !finishedEditing ? itemToEditData.id : "",
    title: isEditing && !finishedEditing ? itemToEditData.title : "",
    amount:
      isEditing && !finishedEditing ? itemToEditData.amount.toString() : "",
    date: moment().format("MMMM Do YYYY"),
    type: isEditing && !finishedEditing ? itemToEditData.type : "expense",
  });

  function toggleExpenseOrIncomeHandler(dataType: "expense" | "income"): void {
    setInputData((prevState) => {
      return {
        ...prevState,
        type: dataType,
      };
    });
  }

  function dataEnteredHandler(
    inputIdentifier: string,
    enteredText: string
  ): void {
    setInputData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  async function submitDataHandler(inputData: DataObj): Promise<void> {
    const titleIsValid = !!inputData.title?.trim();
    const amountIsValid = !!inputData.amount;

    if (!titleIsValid) {
      Alert.alert("Please enter a title! 🤯");
      return;
    }

    if (!amountIsValid) {
      Alert.alert(
        "Please enter a valid amount! 🤯",
        "Must be a number greater than 0"
      );
      return;
    }

    try {
      setIsLoading(true);
      const docRef = await addDoc(
        collection(db, "users", currUserDocId, "data"),
        inputData
      );
      const firebaseId = docRef.id;

      const modifiedObjectWithId = {
        ...inputData,
        id: firebaseId,
      };
      setIsLoading(false);

      dispatch(addItem(modifiedObjectWithId));
      navigation.goBack();
      return;
    } catch {
      Alert.alert("error uploading", "please try again ❌");
      return;
    }
  }

  async function editDataHandler(inputData: DataObj): Promise<void> {
    const titleIsValid = !!inputData.title?.trim();
    const amountIsValid = !!inputData.amount;

    if (!titleIsValid) {
      Alert.alert("Please enter a title! 🤯");
      return;
    }

    if (!amountIsValid) {
      Alert.alert(
        "Please enter a valid amount! 🤯",
        "Must be a number greater than 0"
      );
      return;
    }

    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "data", itemToEditId));
      const docRef = await addDoc(collection(db, "data"), inputData);
      const firebaseId = docRef.id;

      const modifiedObjectWithId = {
        ...inputData,
        id: firebaseId,
      };
      setIsLoading(false);
      setFinishedEditing(true);

      dispatch(addItem(modifiedObjectWithId));
      dispatch(removeItem(itemToEditId));
      navigation.goBack();
      return;
    } catch {
      Alert.alert("Error deleting... ❌");
      return;
    }
  }

  let topContent: JSX.Element;
  let headingContent: string;

  if (!isEditing) {
    topContent = (
      <Button.Group
        isAttached
        borderWidth={1}
        borderRadius={5}
        borderColor="darkBlue.600"
      >
        <IconButton
          icon={<Icon as={Entypo} name="minus" color="white" />}
          bgColor={inputData.type === "expense" ? "darkBlue.600" : null}
          w={66}
          onPress={toggleExpenseOrIncomeHandler.bind(this, "expense")}
        />
        <IconButton
          icon={<Icon as={Entypo} name="plus" color="white" />}
          bgColor={inputData.type === "income" ? "darkBlue.600" : null}
          w={66}
          onPress={toggleExpenseOrIncomeHandler.bind(this, "income")}
        />
      </Button.Group>
    );

    if (inputData.type === "expense") headingContent = "New expense";
    if (inputData.type === "income") headingContent = "New income";
  }

  return (
    <>
      {topContent!}
      <Heading color="white" mt={isEditing ? 0 : 5}>
        {headingContent!}
      </Heading>
      <VStack w="100%" mt={isEditing ? 0 : 5} space={5}>
        <CustomInput
          title="Title"
          type="default"
          onChangeText={dataEnteredHandler.bind(this, "title")}
          value={inputData.title}
        />
        <CustomInput
          title="Amount"
          type="decimal-pad"
          onChangeText={dataEnteredHandler.bind(this, "amount")}
          value={inputData.amount}
        />
      </VStack>
      <Flex direction="row" w="100%" mt={5} justify="space-between">
        <Button
          w={120}
          variant="ghost"
          onPress={() => navigation.goBack()}
          _text={{ fontSize: "md", color: "error.400", fontWeight: "medium" }}
        >
          Cancel
        </Button>
        <Button
          w={120}
          bg={
            (isEditing && "darkBlue.600") ||
            (inputData.type === "expense" ? "danger.400" : "tertiary.500")
          }
          onPress={
            isEditing
              ? editDataHandler.bind(this, inputData)
              : submitDataHandler.bind(this, inputData)
          }
          _text={{ fontSize: "md", fontWeight: "medium" }}
          isLoading={isLoading}
          isLoadingText={isEditing ? "Updating" : "Adding"}
        >
          {isEditing ? "Update" : "Add"}
        </Button>
      </Flex>
    </>
  );
};

export default CustomForm;
