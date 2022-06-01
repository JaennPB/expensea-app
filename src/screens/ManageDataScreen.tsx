import { Button, IconButton, Icon, Flex } from "native-base";
import React from "react";

import CustomForm from "../components/CustomForm";

import { Entypo } from "@expo/vector-icons";

import { useAppRoute, useAppNavigation } from "../hooks/navigationHooks";

const ManageDataScreen: React.FC = () => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const mealId = route.params?.itemId;
  const isEditing = !!mealId;
  const [isExpense, setIsExpense] = React.useState<boolean>(true);
  const [isIncome, setIsIncome] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string | null>(null);
  const [amount, setAmount] = React.useState<string | null>(null);

  function deleteItemHandler(): void {
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit" : "Add",
      headerLeft: () => (
        <Button
          variant="ghost"
          _text={{ color: "error.400" }}
          size="lg"
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
      ),
      headerRight: () =>
        isEditing ? (
          <Button
            variant="ghost"
            _text={{ color: "error.400" }}
            size="lg"
            onPress={deleteItemHandler}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="ghost"
            _text={{ color: "darkBlue.600" }}
            size="lg"
            onPress={deleteItemHandler}
          >
            Save
          </Button>
        ),
    });
  }, [navigation, isEditing]);

  let topContent!: JSX.Element;

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
  }

  return (
    <Flex flex={1} bg="darkBlue.700" align="center" p={5}>
      {topContent}
      <CustomForm />
    </Flex>
  );
};

export default ManageDataScreen;
