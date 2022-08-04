import { Flex, View } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import InfoBox from "../components/UI/InfoBox";

import { useReduceItems, useGetDates } from "../hooks/utils";

const ExpensesScreen = () => {
  const dataArr = useAppSelector((state) => state.dataArr);

  const expensesArr = dataArr.filter((element) => element.type === "expense");

  return (
    <Flex flex={1} bg="darkBlue.800">
      <View p={5}>
        <InfoBox
          bgColor="danger.400"
          data={"-$" + useReduceItems({ expensesArr }, "expenses").toFixed(2)}
          title="Expenses:"
          textColor="white"
          index={1}
        />
      </View>
      <DataList
        dataToDisplay="expenses"
        datesWithDataArr={useGetDates("expense", dataArr)}
      />
    </Flex>
  );
};

export default ExpensesScreen;
