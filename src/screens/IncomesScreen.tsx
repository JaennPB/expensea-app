import React from "react";
import { Flex, VStack } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/InfoBox";

const IncomesScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);

  const incomesArr = dataArr.filter((element) => element.type === "income");

  const incomesSum: number = incomesArr.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);

  return (
    <Flex flex={1} bg="darkBlue.800">
      <VStack p={5} space={2}>
        <InfoBox
          color="success.500"
          data={"-$" + incomesSum.toFixed(2)}
          type="Incomes:"
        />
      </VStack>

      <DataList dataArr={dataArr} />
    </Flex>
  );
};

export default IncomesScreen;
