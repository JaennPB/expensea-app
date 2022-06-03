import React from "react";
import { Alert } from "react-native";
import { VStack, Flex, Button, Heading, IconButton, Icon } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { addItem, removeItem } from "../app/mainSlice";

import moment from "moment";

import CustomInput from "./UI/CustomInput";

import { Entypo } from "@expo/vector-icons";

interface Props {
  isEditing: boolean;
  itemToEditId: string;
}

const CustomForm: React.FC<Props> = ({ isEditing, itemToEditId }) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const dataArr = useAppSelector((state) => state.dataArr);
  const itemData = dataArr.find((item) => item.id === itemToEditId)!;

  const [isExpense, setIsExpense] = React.useState<boolean>(
    isEditing ? !!(itemData.type === "expense") : true
  );
  const [isIncome, setIsIncome] = React.useState<boolean>(
    isEditing ? !!(itemData.type === "income") : false
  );
  const [data, setData] = React.useState<{
    title: string;
    amount: string;
  }>({
    title: isEditing ? itemData.title : "",
    amount: isEditing ? itemData.amount.toString() : "",
  });

  function dataEnteredHandler(
    inputIdentifier: string,
    enteredText: string
  ): void {
    setData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  function submitOrUpdateDataHandler(data: {
    title: string;
    amount: string;
  }): void {
    const titleIsInvalid = data.title.trim() === "";
    const amountIsInvalid = +data.amount <= 0;

    if (titleIsInvalid) {
      Alert.alert("Please enter a title! 🤯");
      return;
    }

    if (amountIsInvalid) {
      Alert.alert(
        "Please enter a valid amount! 🤯",
        "Must be a number greater than 0"
      );
      return;
    }

    const modifiedDataObject = {
      id: new Date().getTime() + "",
      title: data.title.trim(),
      amount: +data.amount,
      date: moment().format("MMMM Do YYYY"),
      type: isExpense ? "expense" : "income",
    };

    if (isEditing) {
      dispatch(removeItem(itemToEditId));
    }

    dispatch(addItem(modifiedDataObject));
    navigation.goBack();
  }

  function toggleExpenseOrIncomeHandler(dataType: string): void {
    if (dataType === "expense" && !isExpense) {
      setIsExpense(true);
      setIsIncome(false);
    }

    if (dataType === "income" && !isIncome) {
      setIsIncome(true);
      setIsExpense(false);
    }
  }

  let topContent!: JSX.Element;
  let headingContent!: string;

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
          bgColor={isExpense ? "darkBlue.600" : null}
          w={66}
          onPress={toggleExpenseOrIncomeHandler.bind(this, "expense")}
        />
        <IconButton
          icon={<Icon as={Entypo} name="plus" color="white" />}
          bgColor={isIncome ? "darkBlue.600" : null}
          w={66}
          onPress={toggleExpenseOrIncomeHandler.bind(this, "income")}
        />
      </Button.Group>
    );

    if (isExpense) headingContent = "New expense";
    if (isIncome) headingContent = "New income";
  }

  return (
    <>
      {topContent}
      <Heading color="white" mt={isEditing ? 0 : 5}>
        {headingContent}
      </Heading>
      <VStack w="100%" mt={isEditing ? 0 : 5} space={5}>
        <CustomInput
          title="Title"
          type="default"
          onChangeText={dataEnteredHandler.bind(this, "title")}
          value={data.title}
        />
        <CustomInput
          title="Amount"
          type="decimal-pad"
          onChangeText={dataEnteredHandler.bind(this, "amount")}
          value={data.amount}
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
          bg={isExpense ? "error.400" : "success.400"}
          onPress={submitOrUpdateDataHandler.bind(this, data)}
          _text={{ fontSize: "md", fontWeight: "medium" }}
        >
          {isEditing ? "Update" : "Add"}
        </Button>
      </Flex>
    </>
  );
};

export default CustomForm;
