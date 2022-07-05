import React from "react";
import { Flex, VStack } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/UI/InfoBox";

import { useReduceItems } from "../hooks/utils";

const IncomesScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const incomesArr = dataArr.filter((element) => element.type === "income");

  return (
    <Flex flex={1} bg="darkBlue.800">
      <VStack pb={5} px={5} py={2} space={2}>
        <InfoBox
          color="tertiary.500"
          data={"$" + useReduceItems({ incomesArr }, "incomes").toFixed(2)}
          title="Incomes:"
          dataColorType="white"
        />
      </VStack>
      <DataList dataToDisplay="incomes" />
    </Flex>
  );
};

export default IncomesScreen;
