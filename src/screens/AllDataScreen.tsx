import React from "react";
import { Alert } from "react-native";
import { Flex, VStack } from "native-base";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";
import { addItem, setData } from "../app/mainSlice";

import { useReduceItems } from "../hooks/utils";

import { DataObj } from "../../App";

const AllDataScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const dispatch = useAppDispatch();

  const expensesArr = dataArr.filter((element) => element.type === "expense");
  const incomesArr = dataArr.filter((element) => element.type === "income");

  // FIXME: get data and set redux store with data to make it local

  React.useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const data = await getDocs(collection(db, "data"));

        if (!data.empty) {
          let dataArr: any = [];
          data.forEach((doc) => {
            dataArr.unshift({ ...doc.data(), id: doc.id });
          });

          dispatch(setData(dataArr));
        }
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
          data={"$" + useReduceItems({ incomesArr }, "incomes").toFixed(2)}
          title="Incomes:"
        />
        <InfoBox
          color="error.400"
          data={"-$" + useReduceItems({ expensesArr }, "expenses").toFixed(2)}
          title="Expenses:"
        />
        <InfoBox
          color="darkBlue.700"
          data={
            "$" +
            useReduceItems({ incomesArr, expensesArr }, "total").toFixed(2)
          }
          title="Total Net Worth:"
        />
      </VStack>
      <DataList dataArr={dataArr} dataToDisplay="all" />
    </Flex>
  );
};

export default AllDataScreen;
