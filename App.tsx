import { NativeBaseProvider } from "native-base";

import { Provider } from "react-redux";
import { store } from "./src/app/store";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AddDataPointScreen from "./src/screens/AddDataPointScreen";
import AllDataScreen from "./src/screens/AllDataScreen";
import RecentDataScreen from "./src/screens/RecentDataScreen";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export type NavParams = {
  AllDataScreen: undefined;
  RecentDataScreen: undefined;
  AddDataPointScreen: undefined;
  BottomTabsNav: undefined;
};

const Stack = createNativeStackNavigator<NavParams>();
const BottomTabs = createBottomTabNavigator<NavParams>();

export type AppScreenProp = NativeStackNavigationProp<NavParams>;

function BottomTabsNav() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="AllDataScreen"
        component={AllDataScreen}
        options={{
          headerTitle: "All expenses",
          tabBarLabel: "All",
          tabBarIcon: () => <Feather name="list" size={24} color="black" />,
        }}
      />
      <BottomTabs.Screen
        name="RecentDataScreen"
        component={RecentDataScreen}
        options={{
          headerTitle: "Recent",
          tabBarLabel: "Recent",
          tabBarIcon: () => <AntDesign name="back" size={24} color="black" />,
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="BottomTabsNav"
              component={BottomTabsNav}
            />
            <Stack.Screen
              name="AddDataPointScreen"
              component={AddDataPointScreen}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
