import React from "react";
import { Alert } from "react-native";
import { Flex, Text, VStack } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { setData, setDates } from "../app/mainSlice";

import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../db/firebase";

import DataList from "../components/DataList";
import InfoBox from "../components/UI/InfoBox";

import { useReduceItems } from "../hooks/utils";

const AllDataScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const dataArr = useAppSelector((state) => state.dataArr);
  const currUserDocId = useAppSelector((state) => state.userId);
  const currUsernameFromStore = useAppSelector((state) => state.username);
  const datesArray = useAppSelector((state) => state.datesWithDataArr);

  const [isLoading, setIsLoading] = React.useState(true);

  const expensesArr = dataArr.filter((element) => element.type === "expense");
  const incomesArr = dataArr.filter((element) => element.type === "income");

  React.useEffect(() => {
    async function getData() {
      try {
        const data = await getDocs(
          collection(db, "users", currUserDocId, "data")
        );
        const dates = await getDoc(doc(db, "users", currUserDocId));

        if (!data.empty) {
          data.forEach((doc) => {
            dispatch(setData({ ...doc.data(), id: doc.id }));
          });
        }

        if (dates.exists()) {
          dispatch(setDates(dates.data()?.datesWithDataArr));
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
  }, []);

  React.useLayoutEffect(() => {
    if (!currUsernameFromStore) {
      async function fetchUserName() {
        try {
          const cachedUserName = await AsyncStorage.getItem("username");
          navigation.setOptions({
            headerTitle: `Welcome back, ${cachedUserName}!`,
          });
        } catch {
          console.log("get name failed");
        }
      }

      fetchUserName();
    }

    navigation.setOptions({
      headerTitle: `Welcome back, ${currUsernameFromStore}!`,
    });
  }, [currUsernameFromStore]);

  return (
    <Flex flex={1} bg="darkBlue.800">
      <VStack p={5} space={2}>
        <InfoBox
          color="darkBlue.700"
          data={"+$" + useReduceItems({ incomesArr }, "incomes").toFixed(2)}
          title="Incomes:"
          dataColorType="tertiary.500"
        />
        <InfoBox
          color="darkBlue.700"
          data={"-$" + useReduceItems({ expensesArr }, "expenses").toFixed(2)}
          title="Expenses:"
          dataColorType="danger.400"
        />
        <InfoBox
          color="darkBlue.600"
          data={
            "$" +
            useReduceItems({ incomesArr, expensesArr }, "total").toFixed(2)
          }
          title="Total balance:"
          dataColorType="white"
        />
      </VStack>
      <DataList
        dataToDisplay="all"
        isLoading={isLoading}
        datesWithDataArr={datesArray}
      />
    </Flex>
  );
};

export default AllDataScreen;
