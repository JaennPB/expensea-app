import React from "react";
import { Box, Heading } from "native-base";

interface Props {
  date: string;
}

const DateItem: React.FC<Props> = ({ date }) => {
  return (
    <Box py={2} px={5} mb={5} borderRadius={5} bgColor="darkBlue.600">
      <Heading color="white" fontSize={20} fontWeight="semibold">
        {date}
      </Heading>
    </Box>
  );
};

export default DateItem;
