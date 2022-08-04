import { useLayoutEffect } from "react";
import { Alert } from "react-native";
import { Button, Flex } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { removeItem, deleteDate } from "../app/mainSlice";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

import CustomForm from "../components/CustomForm";

const ManageDataScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const currUserDocId = useAppSelector((state) => state.userId);
  const dataArr = useAppSelector((state) => state.dataArr);
  const datesArr = useAppSelector((state) => state.datesWithDataArr);

  const route = useRoute<RouteProp<NavParams, "ManageDataScreen">>();
  const itemId = route.params.itemIdtoEdit;
  const isEditing = !!itemId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit" : "Add",
      headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
      headerBackVisible: false,
      headerRight: () =>
        isEditing && (
          <Button
            variant="ghost"
            _text={{
              color: "danger.400",
              fontSize: "md",
              fontWeight: "medium",
              fontFamily: "Poppins_400Regular",
            }}
            size="lg"
            onPress={deleteItemHandler}
          >
            Delete
          </Button>
        ),
    });
  }, [navigation, isEditing]);

  async function deleteItemHandler() {
    if (!itemId) return;

    dispatch(removeItem(itemId));
    navigation.goBack();

    try {
      await deleteDoc(doc(db, "users", currUserDocId, "data", itemId));
    } catch {
      Alert.alert("Error deleting... ❌");
      return;
    }

    const CurrItem = dataArr.find((item) => item.id === itemId)!;
    const currentItemsInDate = dataArr.filter(
      (item) => item.date === CurrItem.date
    );

    if (currentItemsInDate.length === 1) {
      const UpdatedDatesArr = datesArr.filter((item) => item != CurrItem.date);
      await updateDoc(doc(db, "users", currUserDocId), {
        datesWithDataArr: UpdatedDatesArr,
      });

      dispatch(deleteDate(CurrItem.date));
    }
  }

  return (
    <Flex flex={1} bg="darkBlue.700" align="center" pt={5} px={5}>
      <CustomForm isEditing={isEditing} itemToEditId={itemId!} />
    </Flex>
  );
};

export default ManageDataScreen;
