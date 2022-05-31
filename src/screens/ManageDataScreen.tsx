import { Button, IconButton, Icon, Flex } from "native-base";
import React from "react";

import CustomForm from "../components/CustomForm";

import { Entypo } from "@expo/vector-icons";

import { useAppRoute, useAppNavigation } from "../hooks/navigationHooks";

const ManageDataScreen: React.FC = () => {
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

  let topContent!: JSX.Element;

  if (!isEditing) {
    topContent = (
      <Button.Group
        isAttached
        borderWidth={1}
        borderRadius={5}
        borderColor="darkBlue.600"
      >
        <IconButton
          icon={<Icon as={Entypo} name="minus" color="white" />}
          bgColor="darkBlue.600"
          w={66}
        />
        <IconButton
          icon={<Icon as={Entypo} name="plus" color="white" />}
          // bgColor="success.400"
          w={66}
        />
      </Button.Group>
    );
  }

  return (
    <Flex flex={1} bg="darkBlue.700" align="center" p={5}>
      {topContent}
      <CustomForm />
    </Flex>
  );
};

export default ManageDataScreen;
