import React from "react";
import { VStack } from "native-base";

import InfoBox from "./InfoBox";

interface Props {
  dataArr: {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  }[];
  period: string;
}

const DataSummary: React.FC<Props> = ({ dataArr, period }) => {
  const expensesArr = dataArr.filter((element) => element.type === "expense");
  const incomesArr = dataArr.filter((element) => element.type === "income");

  const expensesSum: number = expensesArr.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const incomesSum: number = incomesArr.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);

  const total = incomesSum - expensesSum;

  return (
    <VStack p={5} space={2}>
      <InfoBox
        color="error.400"
        data={"-$" + expensesSum.toFixed(2)}
        type="Expenses:"
      />
      <InfoBox
        color="success.500"
        data={"$" + total.toFixed(2)}
        type={period}
      />
    </VStack>
  );
};

export default DataSummary;
