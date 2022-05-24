import { View, Text } from "react-native";
import React from "react";

interface Props {
  dataArr: {
    id: string;
    title?: string;
    amount: number;
    date: object;
    type: string;
  }[];
  period: string;
}

const ExpensesSummary: React.FC<Props> = (props: Props) => {
  const expensesArr = props.dataArr.filter(
    (element) => element.type === "expense"
  );
  const incomesArr = props.dataArr.filter(
    (element) => element.type === "income"
  );

  const expenseSum: number = expensesArr.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const incomeSum: number = incomesArr.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);

  return (
    <View>
      <Text>Showing: {props.period}</Text>
      <Text>-{expenseSum.toFixed(2)}</Text>
      <Text>+{incomeSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
