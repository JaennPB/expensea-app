import React from "react";
import { Alert } from "react-native";
import { Flex, VStack } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";

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

  React.useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const data = await getDocs(collection(db, "data"));
        data.forEach((doc) => console.log(doc.data()));
      } catch {
        Alert.alert("No data from server");
      }
    }

    getData();
  }, []);

  return (
    <Flex flex={1} bg="darkBlue.800">
      <VStack pb={5} px={5} py={2} space={2}>
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
      <DataList dataArr={dataArr} dataToDisplay="all" />
    </Flex>
  );
};

export default AllDataScreen;
