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
  let dataByFilter;

  if (dataToDisplay === "all") {
    dataByFilter = useAppSelector((state) => state.dataArr);
  }

  if (dataToDisplay === "expenses") {
    const allData = useAppSelector((state) => state.dataArr);
    dataByFilter = allData.filter((item) => item.type === "expense");
  }

  if (dataToDisplay === "incomes") {
    const allData = useAppSelector((state) => state.dataArr);
    dataByFilter = allData.filter((item) => item.type === "income");
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

  let noDataContent!: JSX.Element;

  if (dataArr.length <= 0) {
    noDataContent = (
      <Heading color="white" size="sm" textAlign="center">
        Please, add something! 😉
      </Heading>
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
