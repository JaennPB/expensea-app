import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { AppScreenProp } from "../../App";
import { NavParams } from "../../App";

export const useAppNavigation = () => useNavigation<AppScreenProp>();
export const useAppRoute = () =>
  useRoute<RouteProp<NavParams, "ManageDataScreen">>();
