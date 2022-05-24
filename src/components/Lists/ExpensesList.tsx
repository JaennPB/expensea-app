import { FlatList, ListRenderItemInfo } from "react-native";
import React from "react";
import { Text } from "native-base";

interface Props {
  dataArr: {
    id: string;
    title?: string;
    amount: number;
    date: object;
    type: string;
  }[];
}

const ExpensesList: React.FC<Props> = (props: Props) => {
  function renderDataItem(
    itemData: ListRenderItemInfo<typeof props.dataArr[0]>
  ): JSX.Element {
    const dataItem = itemData.item;

    return <Text>{dataItem.title}</Text>;
  }

  return (
    <FlatList
      data={props.dataArr}
      renderItem={renderDataItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
