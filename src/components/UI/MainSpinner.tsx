import React from "react";
import { HStack, Heading, Spinner } from "native-base";

const MainSpinner = () => {
  return (
    <HStack flex={1} space={2} justifyContent="center" alignItems="center">
      <Spinner
        accessibilityLabel="Loading data"
        color="darkBlue.600"
        size="lg"
      />
      <Heading fontSize="lg" color="darkBlue.600">
        Loading
      </Heading>
    </HStack>
  );
};

export default MainSpinner;
