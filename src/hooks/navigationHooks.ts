import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppScreenProp = NativeStackNavigationProp<NavParams>;

export const useAppNavigation = () => useNavigation<AppScreenProp>();
