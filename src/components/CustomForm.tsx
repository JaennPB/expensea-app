import { Button, Flex, VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";

import moment from "moment";

import { useAppNavigation } from "../hooks/navigationHooks";

import { addItem, setDates, updateItem } from "../app/mainSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

import CustomInput from "./UI/CustomInput";
import ExpenseOrIncomeButtons from "./UI/ExpenseOrIncomeButtons";

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

  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    id: isEditing ? itemToEditData.id : "",
    title: isEditing ? itemToEditData.title : "",
    amount: isEditing ? itemToEditData.amount.toString() : "",
    description: isEditing ? itemToEditData.description : "",
    date: moment().format("MMMM Do YYYY"),
    type: isEditing ? itemToEditData.type : "expense",
  });

  function toggleDataTypeHandler(dataType: "expense" | "income"): void {
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
    setIsLoading(true);

    const titleIsValid = !!inputData.title?.trim();
    const amountIsValid = !!inputData.amount;

    if (!titleIsValid) {
      Alert.alert("Please enter a title! 🤯");
      setIsLoading(false);
      return;
    }

    if (!amountIsValid) {
      Alert.alert(
        "Please enter a valid amount! 🤯",
        "Must be a number greater than 0"
      );
      setIsLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, "users", currUserDocId, "data"),
        inputData
      );
      const firebaseId = docRef.id;
      const modifiedObjectWithId = {
        ...inputData,
        id: firebaseId,
      };

      dispatch(addItem(modifiedObjectWithId));

      const userDocRef = doc(db, "users", currUserDocId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.data()?.datesWithDataArr.includes(inputData.date)) {
        const datesArr = [inputData.date, ...userDoc.data()?.datesWithDataArr];
        await updateDoc(userDocRef, {
          datesWithDataArr: datesArr,
        });
        dispatch(setDates(datesArr));
      }

      setIsLoading(false);

      navigation.goBack();

      return;
    } catch {
      Alert.alert("error uploading", "please try again ❌");
      setIsLoading(false);

      return;
    }
  }

  async function editDataHandler(inputData: DataObj) {
    setIsLoading(true);

    const titleIsValid = !!inputData.title?.trim();
    const amountIsValid = !!inputData.amount;

    if (!titleIsValid) {
      Alert.alert("Please enter a title! 🤯");
      setIsLoading(false);
      return;
    }

    if (!amountIsValid) {
      Alert.alert(
        "Please enter a valid amount! 🤯",
        "Must be a number greater than 0"
      );
      setIsLoading(false);
      return;
    }

    try {
      const docRef = doc(db, "users", currUserDocId, "data", itemToEditId);
      await updateDoc(docRef, {
        title: inputData.title,
        amount: inputData.amount,
        description: inputData.description,
      });

      dispatch(updateItem({ id: itemToEditId, data: inputData }));

      setIsLoading(false);

      navigation.goBack();

      return;
    } catch {
      Alert.alert("Error deleting... ❌");
      setIsLoading(false);

      return;
    }
  }

  return (
    <>
      {!isEditing && (
        <ExpenseOrIncomeButtons
          onPressExpense={toggleDataTypeHandler.bind(this, "expense")}
          onPressIncome={toggleDataTypeHandler.bind(this, "income")}
          inputType={inputData.type}
        />
      )}
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
          _text={{
            fontSize: 18,
            color: "white",
            fontFamily: "Poppins_400Regular",
          }}
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
          _text={{ fontSize: 18, fontFamily: "Poppins_400Regular" }}
          w={190}
          _pressed={{ backgroundColor: "" }}
          isLoading={isLoading}
          isLoadingText="Loading..."
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
