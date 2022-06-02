import { Button, Flex, Text } from "native-base";
import React from "react";

import CustomForm from "../components/CustomForm";

import { useAppRoute, useAppNavigation } from "../hooks/navigationHooks";

const ManageDataScreen: React.FC = () => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const itemId = route.params?.itemId;
  const isEditing = !!itemId;

  function deleteItemHandler(): void {
    navigation.goBack();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit" : "Add",
      headerBackVisible: false,
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
    <Flex
      flex={1}
      bg="darkBlue.700"
      align="center"
      pt={isEditing ? 0 : 5}
      px={5}
    >
      <CustomForm isEditing={isEditing} itemToEditId={itemId} />
    </Flex>
  );
};

export default ManageDataScreen;
