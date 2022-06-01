import React from "react";
import { VStack } from "native-base";

import CustomInput from "./UI/CustomInput";

interface dataObj {
  title: string;
  amount: string;
}

const CustomForm: React.FC = () => {
  const [data, setData] = React.useState<dataObj>({
    title: "",
    amount: "",
  });

  function dataEnteredHandler(
    inputIdentifier: string,
    enteredText: string
  ): void {
    setData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  console.log(data);

  return (
    <VStack w="100%" mt={10} space={5}>
      <CustomInput
        title="Title"
        type="default"
        onChangeText={dataEnteredHandler.bind(this, "title")}
        value={data["title"]}
      />
      <CustomInput
        title="Amount"
        type="decimal-pad"
        onChangeText={dataEnteredHandler.bind(this, "amount")}
        value={data["amount"]}
      />
    </VStack>
  );
};

export default CustomForm;
