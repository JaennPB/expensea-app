import React from "react";
import { Flex } from "native-base";
import { FlatList, ListRenderItemInfo } from "react-native";
import DataItem from "./DataItem";

interface Props {
  dataArr: {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  }[];
}

const DataList: React.FC<Props> = (props: Props) => {
  function renderDataItem(
    itemData: ListRenderItemInfo<typeof props.dataArr[0]>
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
      <FlatList
        data={props.dataArr}
        renderItem={renderDataItem}
        keyExtractor={(item) => item.id}
      />
    </Flex>
  );
};

export default DataList;
