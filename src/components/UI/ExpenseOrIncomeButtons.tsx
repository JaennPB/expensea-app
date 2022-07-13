import React from "react";
import { GestureResponderEvent } from "react-native";
import { Button, IconButton, Icon } from "native-base";

import { Entypo } from "@expo/vector-icons";

interface Props {
  onPressExpense: (event: GestureResponderEvent) => void;
  onPressIncome: (event: GestureResponderEvent) => void;
  inputType: string;
}

const ExpenseOrIncomeButtons: React.FC<Props> = ({
  onPressExpense,
  onPressIncome,
  inputType,
}) => {
  return (
    <Button.Group
      isAttached
      borderWidth={1}
      borderRadius={5}
      borderColor="darkBlue.600"
    >
      <IconButton
        icon={<Icon as={Entypo} name="minus" color="white" />}
        bgColor={inputType === "expense" ? "darkBlue.600" : null}
        w={66}
        onPress={onPressExpense}
      />
      <IconButton
        icon={<Icon as={Entypo} name="plus" color="white" />}
        bgColor={inputType === "income" ? "darkBlue.600" : null}
        w={66}
        onPress={onPressIncome}
      />
    </Button.Group>
  );
};

export default ExpenseOrIncomeButtons;
