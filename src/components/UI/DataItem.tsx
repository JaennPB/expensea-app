import React from "react";
import { Text, Box, Flex, Divider, Pressable } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../../hooks/navigationHooks";

interface Props {
  id: string;
  title: string;
  amount: string;
  date: string;
  type: string;
}

const DataItem: React.FC<Props> = ({ amount, date, id, title, type }) => {
  const navigation = useAppNavigation();

  function navigateToEditItemHandler(): void {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", { itemId: id });
  }

  return (
    <Pressable _pressed={{ opacity: 0.5 }} onPress={navigateToEditItemHandler}>
      <Flex flexDir="row" justify="space-between" borderRadius={5}>
        <Box>
          <Text color="lightText" fontSize="20">
            {title}
          </Text>
          <Text color="muted.300" fontSize="xs">
            {date}
          </Text>
        </Box>
        <Flex
          bg={type === "expense" ? "danger.400" : "tertiary.500"}
          justify="center"
          align="center"
          w={100}
          borderRadius={5}
        >
          <Text color="white" fontSize="lg" fontWeight="semibold">
            {type === "expense" ? "-$" + amount : "$" + amount}
          </Text>
        </Flex>
      </Flex>
      <Divider my={5} thickness={1} bg="darkBlue.600" />
    </Pressable>
  );
};

export default DataItem;
