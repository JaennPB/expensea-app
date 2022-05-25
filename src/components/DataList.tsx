import React from "react";
import { Flex, Text } from "native-base";
import { FlatList, ListRenderItemInfo } from "react-native";

interface Props {
  dataArr: {
    id: string;
    title?: string;
    amount: number;
    date: object;
    type: string;
  }[];
}

const DataList: React.FC<Props> = (props: Props) => {
  function renderDataItem(
    itemData: ListRenderItemInfo<typeof props.dataArr[0]>
  ): JSX.Element {
    const dataItem = itemData.item;

    return <Text>{dataItem.title}</Text>;
  }

  return (
    <Flex flex={1}>
      <FlatList
        data={props.dataArr}
        renderItem={renderDataItem}
        keyExtractor={(item) => item.id}
      />
    </Flex>
  );
};

export default DataList;
