import React from "react";
import { Flex, VStack } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/UI/InfoBox";

import { useReduceItems } from "../hooks/utils";

const ExpensesScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const expensesArr = dataArr.filter((element) => element.type === "expense");

  return (
    <Flex flex={1} bg="darkBlue.800">
      <VStack pb={5} px={5} py={2} space={2}>
        <InfoBox
          color="danger.400"
          data={"-$" + useReduceItems({ expensesArr }, "expenses").toFixed(2)}
          title="Expenses:"
        />
      </VStack>
      <DataList dataToDisplay="expenses" />
    </Flex>
  );
};

export default ExpensesScreen;
