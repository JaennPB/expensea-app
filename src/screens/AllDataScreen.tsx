import React from "react";
import { Flex, VStack } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

const AllDataScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);

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
    <Flex flex={1} bg="darkBlue.800">
      <VStack p={5} space={2}>
        <InfoBox
          color="success.500"
          data={"$" + incomesSum.toFixed(2)}
          type="Incomes:"
        />

        <InfoBox
          color="error.400"
          data={"-$" + expensesSum.toFixed(2)}
          type="Expenses:"
        />

        <InfoBox
          color="darkBlue.700"
          data={"$" + total.toFixed(2)}
          type="Total Net Worth:"
        />
      </VStack>

      <DataList dataArr={dataArr} />
    </Flex>
  );
};

export default AllDataScreen;
