import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Flex, Heading, Spinner } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataItem from "./DataItem";

import { DataObj } from "../../App";

interface Props {
  dataToDisplay: "all" | "expenses" | "incomes";
}

const DataList: React.FC<Props> = ({ dataToDisplay }) => {
  let dataByFilter!: DataObj[];
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

  function renderDataItem(itemData: ListRenderItemInfo<DataObj>): JSX.Element {
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
