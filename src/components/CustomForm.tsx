import React from "react";
import { VStack } from "native-base";

import CustomInput from "./UI/CustomInput";

const CustomForm: React.FC = () => {
  return (
    <VStack w="100%" mt={10} space={5}>
      <CustomInput title="Title" type="default" />
      <CustomInput title="Amount" type="decimal-pad" />
    </VStack>
  );
};

export default CustomForm;
