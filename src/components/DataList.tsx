import { Flex, Heading } from "native-base";
import { FlatList, ListRenderItemInfo } from "react-native";

import Animated, { FadeInUp } from "react-native-reanimated";

import { useAppSelector } from "../hooks/reduxHooks";

import DataItem from "./UI/DataItem";
import DateItem from "./UI/DateItem";
import MainSpinner from "./UI/MainSpinner";

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
    let fetchedData;
    let noDataString;

    if (type === "all") {
      fetchedData = allData;

      noDataString = "Nothing here... please add some data! 📈";
    }
    if (type === "expenses") {
      fetchedData = allData.filter((item) => item.type === "expense");

      noDataString = "Add expenses! 📉";
    }
    if (type === "incomes") {
      fetchedData = allData.filter((item) => item.type === "income");

      noDataString = "Add incomes! 🤑";
    }

    return {
      fetchedData: fetchedData,
      noDataString: noDataString,
    };
  }

  const { fetchedData, noDataString } = dataToDisplayByType(dataToDisplay);

  function renderDateItem(itemData: ListRenderItemInfo<string>) {
    const date = itemData.item;

    const itemsByDate = fetchedData?.filter(
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
      {!isLoading && fetchedData?.length! <= 0 && (
        <Animated.View
          entering={FadeInUp.delay(250)}
          style={{ alignItems: "center" }}
        >
          <Heading color="white" size="sm" fontFamily="Poppins_600SemiBold">
            {noDataString}
          </Heading>
        </Animated.View>
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
