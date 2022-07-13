import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Flex, Heading } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataItem from "./UI/DataItem";
import MainSpinner from "./UI/MainSpinner";
import DateItem from "./UI/DateItem";
import Animated, { FadeInUp } from "react-native-reanimated";

interface Props {
  dataToDisplay: "all" | "expenses" | "incomes";
  isLoading?: boolean;
  datesWithDataArr: string[];
}

const DataList: React.FC<Props> = ({
  dataToDisplay,
  isLoading,
  datesWithDataArr,
}) => {
  const allData = useAppSelector((state) => state.dataArr);

  function dataToDisplayByType(type: string) {
    let fetchedData: DataObj[];
    let noDataString: string;

    if (type === "all") {
      fetchedData = allData;

      noDataString = "Nothing here... please add some data! 📈";
    }
    if (type === "expenses") {
      fetchedData = allData.filter((item) => item.type === "expense");

      noDataString = "Please, add expenses! 📉";
    }
    if (type === "incomes") {
      fetchedData = allData.filter((item) => item.type === "income");

      noDataString = "Please, add incomes! 🤑";
    }

    return {
      fetchedData: fetchedData!,
      noDataString: noDataString!,
    };
  }

  const { fetchedData, noDataString } = dataToDisplayByType(dataToDisplay);

  function renderDateItem(itemData: ListRenderItemInfo<string>) {
    const date = itemData.item;

    const itemsByDate = fetchedData.filter(
      (item) => item.date === itemData.item
    );

    return (
      <>
        <DateItem date={date} />
        {itemsByDate!.map((item, index) => (
          <DataItem
            title={item.title}
            amount={item.amount}
            description={item.description}
            type={item.type}
            id={item.id}
            key={item.id}
            index={index}
          />
        ))}
      </>
    );
  }

  return (
    <Flex flex={1} bg="darkBlue.700" p={5} borderTopRadius={10}>
      {!isLoading && fetchedData.length <= 0 && (
        <Animated.Text entering={FadeInUp.delay(500)}>
          <Heading color="white" size="sm" textAlign="center">
            {noDataString}
          </Heading>
        </Animated.Text>
      )}
      {isLoading && <MainSpinner />}
      {!isLoading && (
        <FlatList
          data={datesWithDataArr}
          renderItem={renderDateItem}
          keyExtractor={(item, index) => item + index}
        />
      )}
    </Flex>
  );
};

export default DataList;
