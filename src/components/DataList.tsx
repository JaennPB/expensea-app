import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import {
  Flex,
  Heading,
  HStack,
  Spinner,
  View,
  Text,
  Divider,
} from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataItem from "./UI/DataItem";

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
  const { fetchedData, noDataString } = dataToDisplayByType(dataToDisplay);

  let noDataContent: JSX.Element;
  if (isLoading) {
    noDataContent = (
      <HStack flex={1} space={2} justifyContent="center" alignItems="center">
        <Spinner
          accessibilityLabel="Loading data"
          color="darkBlue.600"
          size="lg"
        />
        <Heading fontSize="lg" color="darkBlue.600">
          Loading
        </Heading>
      </HStack>
    );
  }

  if (!isLoading && fetchedData.length <= 0) {
    noDataContent = (
      <Heading color="white" size="sm" textAlign="center">
        {noDataString}
      </Heading>
    );
  }

  function dataToDisplayByType(type: string) {
    const allData = useAppSelector((state) => state.dataArr);
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

  function renderDateItem(itemData: ListRenderItemInfo<string>) {
    const dataItem = itemData.item;

    const itemsByDate = fetchedData.filter(
      (item) => item.date === itemData.item
    );

    return (
      <>
        <Heading
          color="white"
          fontSize="lg"
          bg="darkBlue.600"
          mb={5}
          px={5}
          py={2}
          borderRadius={5}
        >
          {dataItem}
        </Heading>
        {itemsByDate.map((item) => (
          <DataItem
            title={item.title}
            amount={item.amount}
            description={item.description}
            type={item.type}
            id={item.id}
            key={item.id}
          />
        ))}
      </>
    );
  }

  return (
    <Flex flex={1} bg="darkBlue.700" px={5} pt={5} borderTopRadius={10}>
      {noDataContent!}
      <FlatList data={datesWithDataArr} renderItem={renderDateItem} />
      {/* {datesWithDataArr.map((date, index) => (
        <View key={date + index}>
          <Heading color="white">{date}</Heading>
          <FlatList
            data={fetchedData}
            renderItem={renderDataItem}
            keyExtractor={(item) => item.id}
          />
        </View> */}
      {/* ))} */}
    </Flex>
  );
};

export default DataList;
