import React from "react";
import { Alert } from "react-native";
import { Flex, VStack } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";

import { useReduceItems } from "../hooks/utils";

const IncomesScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const incomesArr = dataArr.filter((element) => element.type === "income");

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
          color="tertiary.500"
          data={"$" + useReduceItems({ incomesArr }, "incomes")}
          title="Incomes:"
        />
      </VStack>
      <DataList dataToDisplay="incomes" />
    </Flex>
  );
};

export default IncomesScreen;
