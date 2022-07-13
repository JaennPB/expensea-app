import React from "react";
import { Box, Heading } from "native-base";

interface Props {
  date: string;
}

const DateItem: React.FC<Props> = ({ date }) => {
  return (
    <Box
      py={2}
      mb={5}
      borderBottomColor="darkBlue.600"
      borderBottomWidth={1}
      w="60%"
    >
      <Heading color="white" fontSize={20} fontWeight="semibold">
        {date}
      </Heading>
    </Box>
  );
};

export default DateItem;
