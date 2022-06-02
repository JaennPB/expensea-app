import React from "react";
import { Button, Flex } from "native-base";

import { useAppDispatch } from "../hooks/reduxHooks";
import { removeItem } from "../app/mainSlice";

import { useAppRoute, useAppNavigation } from "../hooks/navigationHooks";

import CustomForm from "../components/CustomForm";

const ManageDataScreen: React.FC = () => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const itemId = route.params.itemId!;
  const isEditing = !!itemId;

  function deleteItemHandler(): void {
    dispatch(removeItem(itemId));
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
