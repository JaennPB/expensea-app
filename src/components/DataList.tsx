import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Flex, Heading, HStack, Spinner } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataItem from "./UI/DataItem";

interface Props {
  dataToDisplay: "all" | "expenses" | "incomes";
  isLoading?: boolean;
}

const DataList: React.FC<Props> = ({ dataToDisplay, isLoading }) => {
  let dataByFilter: DataObj[];
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

  if (dataToDisplay === "all") {
    dataByFilter = useAppSelector((state) => state.dataArr);

    if (!isLoading && dataByFilter.length <= 0) {
      noDataContent = (
        <Heading color="white" size="sm" textAlign="center">
          Nothing here... please add some data! 📈
        </Heading>
      );
    }
  }

  if (dataToDisplay === "expenses") {
    const allData = useAppSelector((state) => state.dataArr);
    dataByFilter = allData.filter((item) => item.type === "expense");

    if (!isLoading && dataByFilter.length <= 0) {
      noDataContent = (
        <Heading color="white" size="sm" textAlign="center">
          Please, add expenses! 📉
        </Heading>
      );
    }
  }

  if (dataToDisplay === "incomes") {
    const allData = useAppSelector((state) => state.dataArr);
    dataByFilter = allData.filter((item) => item.type === "income");

    if (!isLoading && dataByFilter.length <= 0) {
      noDataContent = (
        <Heading color="white" size="sm" textAlign="center">
          Please, add incomes! 🤑
        </Heading>
      );
    }
  }

  function renderDataItem(itemData: ListRenderItemInfo<DataObj>): JSX.Element {
    const dataItem = itemData.item;

    return (
      <DataItem
        id={dataItem.id}
        title={dataItem.title}
        amount={dataItem.amount}
        description={dataItem.description}
        date={dataItem.date}
        type={dataItem.type}
      />
    );
  }

  return (
    <Flex flex={1} bg="darkBlue.700" px={5} pt={5} borderTopRadius={10}>
      {noDataContent!}
      <FlatList
        data={dataByFilter!}
        renderItem={renderDataItem}
        keyExtractor={(item) => item.id}
      />
    </Flex>
  );
};

export default DataList;
