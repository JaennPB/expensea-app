import React from "react";
import { Input, FormControl } from "native-base";

interface Props {}

const CustomForm: React.FC<Props> = (props: Props) => {
  return (
    <FormControl>
      <Input placeholder="Title" />
      <Input placeholder="Amount" />
    </FormControl>
  );
};

export default CustomForm;
