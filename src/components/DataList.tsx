import React from "react";
import { Flex, Text } from "native-base";
import { FlatList, ListRenderItemInfo } from "react-native";
import DataItem from "./DataItem";

interface Props {
  dataArr: {
    id: string;
    title: string;
    amount: number;
    date: Date;
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
        title={dataItem.title}
        date={dataItem.date}
        amount={dataItem.amount}
        type={dataItem.type}
      />
    );
  }

  return (
    <Flex flex={1} bg="primary.800" p={5} borderTopRadius={10}>
      <FlatList
        data={props.dataArr}
        renderItem={renderDataItem}
        keyExtractor={(item) => item.id}
      />
    </Flex>
  );
};

export default DataList;
