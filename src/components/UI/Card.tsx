import React from "react";
import { VStack } from "native-base";

interface Props {
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return (
    <VStack bg="darkBlue.700" borderRadius={5} p={5} space={5} w="80%">
      {children}
    </VStack>
  );
};

export default Card;
