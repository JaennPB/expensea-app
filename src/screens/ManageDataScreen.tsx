import { View, Text } from "react-native";
import React from "react";

import { useAppRoute, useAppNavigation } from "../hooks/navigationHooks";

type Props = {};

const ManageDataScreen: React.FC = (props: Props) => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const mealId = route.params?.itemId;
  const isEditing = !!mealId;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit" : "Add",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>{mealId}</Text>
      <Text>ManageExpenseScreen</Text>
    </View>
  );
};

export default ManageDataScreen;
