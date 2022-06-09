import React from "react";
import { Alert } from "react-native";
import { Flex, VStack } from "native-base";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";
import { setData } from "../app/mainSlice";

const AllDataScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const dispatch = useAppDispatch();

  const expensesArr = dataArr.filter((element) => element.type === "expense");
  const incomesArr = dataArr.filter((element) => element.type === "income");

  // TODO: maybe move into own hook or util fn
  function reduceItems(): {
    expensesSum: number;
    incomesSum: number;
    total: number;
  } {
    const expensesSum: number = expensesArr.reduce(
      (sum, expense) => sum + +expense.amount,
      0
    );

    const incomesSum: number = incomesArr.reduce(
      (sum, income) => sum + +income.amount,
      0
    );

    const total = incomesSum - expensesSum;

    return {
      expensesSum,
      incomesSum,
      total,
    };
  }

  async function getData(): Promise<void> {
    try {
      const data = await getDocs(collection(db, "data"));

      if (!data.empty) {
        const newArr: any = [];
        data.forEach((doc) => newArr.unshift(doc.data()));
        dispatch(setData(newArr));
      }
    } catch {
      Alert.alert("No data from server");
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Flex flex={1} bg="darkBlue.800">
      <VStack pb={5} px={5} py={2} space={2}>
        <InfoBox
          color="success.500"
          data={"$" + reduceItems().incomesSum.toFixed(2)}
          type="Incomes:"
        />

        <InfoBox
          color="error.400"
          data={"-$" + reduceItems().expensesSum.toFixed(2)}
          type="Expenses:"
        />

        <InfoBox
          color="darkBlue.700"
          data={"$" + reduceItems().total.toFixed(2)}
          type="Total Net Worth:"
        />
      </VStack>
      <DataList dataArr={dataArr} dataToDisplay="all" />
    </Flex>
  );
};

export default AllDataScreen;
