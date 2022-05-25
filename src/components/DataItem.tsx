import { View, Text, Box } from "native-base";
import React from "react";

interface Props {
  id: string;
  title: string;
  amount: number;
  date: object;
  type: string;
}

const DataItem: React.FC<Props> = (props: Props) => {
  return (
    <Box>
      <Text>DataItem</Text>
    </Box>
  );
};

export default DataItem;
