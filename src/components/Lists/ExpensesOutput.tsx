import { View, Text } from "react-native";
import React from "react";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface Props {
  period: string;
}

const DUMMY_DATA = [
  {
    id: "e1",
    title: "shoes",
    amount: 50.99,
    date: new Date("2022-02-15"),
    type: "expense",
  },
  {
    id: "e2",
    title: "shorts",
    amount: 15.5,
    date: new Date("2022-05-10"),
    type: "expense",
  },
  {
    id: "e3",
    title: "salary",
    amount: 100.5,
    date: new Date("2022-02-11"),
    type: "income",
  },
];

const ExpensesOutput: React.FC<Props> = (props: Props) => {
  return (
    <View>
      <ExpensesSummary dataArr={DUMMY_DATA} period={props.period} />
      <ExpensesList dataArr={DUMMY_DATA} />
    </View>
  );
};

export default ExpensesOutput;
