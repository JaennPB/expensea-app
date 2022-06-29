import React from "react";
import { Alert } from "react-native";
import { Flex, VStack } from "native-base";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/UI/InfoBox";

import {
  getDocs,
  collection,
  doc,
  where,
  query,
  DocumentData,
} from "firebase/firestore";
import { db } from "../db/firebase";
import { setData } from "../app/mainSlice";

import { useReduceItems } from "../hooks/utils";

const AllDataScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const currUserDocId = useAppSelector((state) => state.currUserDocId);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const expensesArr = dataArr.filter((element) => element.type === "expense");
  const incomesArr = dataArr.filter((element) => element.type === "income");

  React.useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const data = await getDocs(
          collection(db, "users", currUserDocId, "data")
        );

        if (!data.empty) {
          data.forEach((doc) => {
            dispatch(setData({ ...doc.data(), id: doc.id }));
          });
        }
        setIsLoading(false);
      } catch {
        Alert.alert("Error from server", "Please reload app 🤯");
        setIsLoading(false);
      }
    }

    if (currUserDocId) {
      getData();
    }
  }, [currUserDocId, db]);

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
