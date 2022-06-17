import React from "react";
import { Alert } from "react-native";
import { Flex, VStack, Text } from "native-base";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";
import { setData } from "../app/mainSlice";

import { useReduceItems } from "../hooks/utils";

const AllDataScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const expensesArr = dataArr.filter((element) => element.type === "expense");
  const incomesArr = dataArr.filter((element) => element.type === "income");

  React.useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const data = await getDocs(collection(db, "data"));
        setIsLoading(false);

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
          color="darkBlue.700"
          data={"$" + useReduceItems({ incomesArr }, "incomes").toFixed(2)}
          title="Incomes:"
        />
        <InfoBox
          color="darkBlue.700"
          data={"-$" + useReduceItems({ expensesArr }, "expenses").toFixed(2)}
          title="Expenses:"
        />
        <InfoBox
          color="darkBlue.600"
          data={
            "$" +
            useReduceItems({ incomesArr, expensesArr }, "total").toFixed(2)
          }
          title="Total Net Worth:"
        />
      </VStack>
      <DataList dataToDisplay="all" isLoading={isLoading} />
    </Flex>
  );
};

export default AllDataScreen;
