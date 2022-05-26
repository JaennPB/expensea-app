import React from "react";
import { Text, Box, Flex, Divider, Pressable } from "native-base";
import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";

interface Props {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: string;
}

const DataItem: React.FC<Props> = (props: Props) => {
  const navigation = useAppNavigation();

  function navigateToEditDataItemHandler(): void {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", { itemId: props.id });
  }

  return (
    <Pressable
      _pressed={{ opacity: 0.5 }}
      onLongPress={navigateToEditDataItemHandler}
    >
      <Flex flexDir="row" justify="space-between" borderRadius={5}>
        <Box>
          <Text color="lightText" fontSize="lg">
            {props.title}
          </Text>
          <Text color="muted.300" fontSize="xs">
            {props.date}
          </Text>
        </Box>
        <Flex
          bg={props.type === "income" ? "success.500" : "error.400"}
          justify="center"
          align="center"
          w={100}
          borderRadius={5}
        >
          <Text color="white" fontSize="md">
            {props.type === "expense"
              ? "-$" + props.amount
              : "$" + props.amount}
          </Text>
        </Flex>
      </Flex>
      <Divider my={5} thickness={1} bg="darkBlue.600" />
    </Pressable>
  );
};

export default DataItem;
