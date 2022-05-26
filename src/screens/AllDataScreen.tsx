import { Flex } from "native-base";
import React from "react";

import { DUMMY_DATA } from "../../DUMMY_DATA";

import DataList from "../components/DataList";
import DataSummary from "../components/DataSummary";

const AllDataScreen: React.FC = () => {
  return (
    <Flex flex={1} bg="darkBlue.800">
      <DataSummary period="Total" dataArr={DUMMY_DATA} />
      <DataList dataArr={DUMMY_DATA} />
    </Flex>
  );
};

export default AllDataScreen;
