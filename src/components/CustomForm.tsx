import React from "react";
import { Alert } from "react-native";
import { VStack, Flex, Button, Heading, IconButton, Icon } from "native-base";

import moment from "moment";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addItem, setDates, updateItem } from "../app/mainSlice";

import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

import CustomInput from "./UI/CustomInput";

import { Entypo } from "@expo/vector-icons";

interface Props {
  isEditing: boolean;
  itemToEditId: string;
}

const CustomForm: React.FC<Props> = ({ isEditing, itemToEditId }) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  let itemToEditData!: DataObj;
  if (isEditing) {
    const dataArr = useAppSelector((state) => state.dataArr);
    itemToEditData = dataArr.find((item) => item.id === itemToEditId)!;
  }
  const currUserDocId = useAppSelector((state) => state.userId);

  const [isLoading, setIsLoading] = React.useState(false);
  const [finishedEditing, setFinishedEditing] = React.useState(false);
  const [inputData, setInputData] = React.useState({
    id: isEditing && !finishedEditing ? itemToEditData.id : "",
    title: isEditing && !finishedEditing ? itemToEditData.title : "",
    amount:
      isEditing && !finishedEditing ? itemToEditData.amount.toString() : "",
    description:
      isEditing && !finishedEditing ? itemToEditData.description : "",
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

  function dataEnteredHandler(inputIdentifier: string, enteredText: string) {
    setInputData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  async function submitDataHandler(inputData: DataObj) {
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
      setIsLoading(false);
      const modifiedObjectWithId = {
        ...inputData,
        id: firebaseId,
      };

      const userDocRef = doc(db, "users", currUserDocId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.data()?.datesWithDataArr.includes(inputData.date)) {
        const datesArr = [...userDoc.data()?.datesWithDataArr, inputData.date];
        await updateDoc(userDocRef, {
          datesWithDataArr: datesArr,
        });
        dispatch(setDates(datesArr));
      }

      dispatch(addItem(modifiedObjectWithId));
      navigation.goBack();
      return;
    } catch {
      Alert.alert("error uploading", "please try again ❌");
      return;
    }
  }

  async function editDataHandler(inputData: DataObj) {
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
      const docRef = doc(db, "users", currUserDocId, "data", itemToEditId);
      setIsLoading(true);
      await updateDoc(docRef, {
        title: inputData.title,
        amount: inputData.amount,
        description: inputData.description,
      });
      setIsLoading(false);

      dispatch(updateItem({ id: itemToEditId, data: inputData }));
      setFinishedEditing(true);

      navigation.goBack();
      return;
    } catch {
      Alert.alert("Error deleting... ❌");
      return;
    }
  }

  let topContent: JSX.Element;

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
  }

  return (
    <>
      {topContent!}
      <VStack w="100%" mt={isEditing ? 0 : 5} space={5}>
        <CustomInput
          title="Title"
          type="default"
          onChangeText={dataEnteredHandler.bind(this, "title")}
          value={inputData.title}
          maxLength={25}
          autoCapitalize="sentences"
        />
        <CustomInput
          title="Amount"
          type="decimal-pad"
          onChangeText={dataEnteredHandler.bind(this, "amount")}
          value={inputData.amount}
          maxLength={7}
          autoCapitalize="none"
        />
        <CustomInput
          title="Description (optional)"
          type="default"
          onChangeText={dataEnteredHandler.bind(this, "description")}
          value={inputData.description}
          maxLength={28}
          autoCapitalize="sentences"
        />
      </VStack>
      <Flex direction="row" w="100%" mt={5} justify="space-between">
        <Button
          variant="ghost"
          onPress={() => navigation.goBack()}
          _text={{ fontSize: "md", color: "white", fontWeight: "medium" }}
        >
          Cancel
        </Button>
        <Button
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
          _pressed={{ backgroundColor: "" }}
          isLoading={isLoading}
          isLoadingText={isEditing ? "Updating" : "Adding"}
        >
          {(isEditing && inputData.type === "expense" && "Update Expense") ||
            (isEditing && inputData.type === "income" && "Update Income") ||
            (!isEditing && inputData.type === "expense" && "Add New Expense") ||
            (!isEditing && inputData.type === "income" && "Add New Income")}
        </Button>
      </Flex>
    </>
  );
};

export default CustomForm;
