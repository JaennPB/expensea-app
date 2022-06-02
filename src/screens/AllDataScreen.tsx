import React from "react";
import { Flex } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataList from "../components/DataList";
import DataSummary from "../components/DataSummary";

const AllDataScreen: React.FC = () => {
  const dataArr = useAppSelector((state) => state.dataArr);

  return (
    <Flex flex={1} bg="darkBlue.800">
      <DataSummary period="Total" dataArr={dataArr} />
      <DataList dataArr={dataArr} />
    </Flex>
  );
};

export default AllDataScreen;
