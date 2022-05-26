import React from "react";
import { Flex } from "native-base";

import { DUMMY_DATA } from "../../DUMMY_DATA";

import DataList from "../components/DataList";
import DataSummary from "../components/DataSummary";

const RecentDataScreen: React.FC = () => {
  return (
    <Flex flex={1} bg="darkBlue.800">
      <DataSummary period="Last 7 days" dataArr={DUMMY_DATA} />
      <DataList dataArr={DUMMY_DATA} />
    </Flex>
  );
};

export default RecentDataScreen;
