import { useNavigation } from "@react-navigation/native";
import type { AppScreenProp } from "../../App";

export const useAppNavigation = () => useNavigation<AppScreenProp>();
