import React from "react";
import { Flex, VStack } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

const ExpensesScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);

  const expensesArr = dataArr.filter((element) => element.type === "expense");

  const expensesSum: number = expensesArr.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <Flex flex={1} bg="darkBlue.800">
      <VStack pb={5} px={5} py={2} space={2}>
        <InfoBox
          color="error.400"
          data={"-$" + expensesSum.toFixed(2)}
          type="Expenses:"
        />
      </VStack>

      <DataList dataArr={dataArr} dataToDisplay="expenses" />
    </Flex>
  );
};

export default ExpensesScreen;
