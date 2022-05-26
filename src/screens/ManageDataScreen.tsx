import { View, Text } from "react-native";
import React from "react";

import { useAppRoute, useAppNavigation } from "../hooks/navigationHooks";
import { Button } from "native-base";

type Props = {};

const ManageDataScreen: React.FC = (props: Props) => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const mealId = route.params?.itemId;
  const isEditing = !!mealId;

  function deleteItemHandler(): void {
    navigation.goBack();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit" : "Add",
      headerRight: () =>
        isEditing && (
          <Button
            variant="ghost"
            _text={{ color: "error.400" }}
            size="lg"
            onPress={deleteItemHandler}
          >
            Delete
          </Button>
        ),
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
