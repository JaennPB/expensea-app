import { View, Text, Box, Flex, VStack } from "native-base";
import React from "react";

import InfoBox from "./InfoBox";

interface Props {
  dataArr: {
    id: string;
    title: string;
    amount: number;
    date: object;
    type: string;
  }[];
  period: string;
}

const DataSummary: React.FC<Props> = (props: Props) => {
  const expensesArr = props.dataArr.filter(
    (element) => element.type === "expense"
  );
  const incomesArr = props.dataArr.filter(
    (element) => element.type === "income"
  );

  const expensesSum: number = expensesArr.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const incomesSum: number = incomesArr.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);

  return (
    <VStack p={5} space={2}>
      <InfoBox
        color="error.400"
        data={"-$" + expensesSum.toFixed(2)}
        type="Expenses:"
      />
      <InfoBox
        color="success.400"
        data={"$" + incomesSum.toFixed(2)}
        type={props.period}
      />
    </VStack>
  );
};

export default DataSummary;
