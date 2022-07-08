import React from "react";
import { Alert } from "react-native";
import { Button, Flex } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { removeItem } from "../app/mainSlice";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../db/firebase";

import CustomForm from "../components/CustomForm";

const ManageDataScreen: React.FC = () => {
  const currUserDocId = useAppSelector((state) => state.userId);
  const route = useRoute<RouteProp<NavParams, "ManageDataScreen">>();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const itemId = route.params.itemIdtoEdit;
  const isEditing = !!itemId;

  async function deleteItemHandler(): Promise<void> {
    if (!itemId) return;

    dispatch(removeItem(itemId));
    navigation.goBack();

    try {
      await deleteDoc(doc(db, "users", currUserDocId, "data", itemId));
    } catch {
      Alert.alert("Error deleting... ❌");
      return;
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit Item" : "Add New Item",
      headerBackVisible: false,
      headerRight: () =>
        isEditing && (
          <Button
            variant="ghost"
            _text={{
              color: "danger.400",
              fontSize: "md",
              fontWeight: "medium",
            }}
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
      <CustomForm isEditing={isEditing} itemToEditId={itemId!} />
    </Flex>
  );
};

export default ManageDataScreen;
