import React from "react";
import { Flex, View } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/UI/InfoBox";

import { useReduceItems } from "../hooks/utils";

const IncomesScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const incomesArr = dataArr.filter((element) => element.type === "income");

  return (
    <Flex flex={1} bg="darkBlue.800">
      <View p={5}>
        <InfoBox
          color="tertiary.500"
          data={"$" + useReduceItems({ incomesArr }, "incomes").toFixed(2)}
          title="Incomes:"
          dataColorType="white"
        />
      </View>
      <DataList dataToDisplay="incomes" />
    </Flex>
  );
};

export default IncomesScreen;
