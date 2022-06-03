import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Flex, Heading } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataItem from "./DataItem";

interface Props {
  dataArr: {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  }[];
  dataToDisplay: "all" | "expenses" | "incomes";
}

const DataList: React.FC<Props> = ({ dataArr, dataToDisplay }) => {
  let dataByFilter!: typeof dataArr[0][];
  let noDataContent!: JSX.Element;

  if (dataToDisplay === "all") {
    dataByFilter = useAppSelector((state) => state.dataArr);

    if (dataByFilter.length <= 0) {
      noDataContent = (
        <Heading color="white" size="sm" textAlign="center">
          Please, give me some data to work with! 📈
        </Heading>
      );
    }
  }

  if (dataToDisplay === "expenses") {
    const allData = useAppSelector((state) => state.dataArr);
    dataByFilter = allData.filter((item) => item.type === "expense");

    if (dataByFilter.length <= 0) {
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

    if (dataByFilter.length <= 0) {
      noDataContent = (
        <Heading color="white" size="sm" textAlign="center">
          Please, add incomes! 🤑
        </Heading>
      );
    }
  }

  function renderDataItem(
    itemData: ListRenderItemInfo<typeof dataArr[0]>
  ): JSX.Element {
    const dataItem = itemData.item;

    return (
      <DataItem
        id={dataItem.id}
        title={dataItem.title}
        date={dataItem.date}
        amount={dataItem.amount}
        type={dataItem.type}
      />
    );
  }

  return (
    <Flex flex={1} bg="darkBlue.700" px={5} pt={5} borderTopRadius={10}>
      {noDataContent}
      <FlatList
        data={dataByFilter}
        renderItem={renderDataItem}
        keyExtractor={(item) => item.id}
      />
    </Flex>
  );
};

export default DataList;
