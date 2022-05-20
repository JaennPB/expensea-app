import { NativeBaseProvider } from "native-base";

import { Provider } from "react-redux";
import { store } from "./src/app/store";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ManageExpenseScreen from "./src/screens/ManageExpenseScreen";
import AllExpensesScreen from "./src/screens/AllExpensesScreen";
import RecentExpensesScreen from "./src/screens/RecentExpensesScreen";

export type NavParams = {
  ManageExpenseScreen: undefined;
  TabsNavScreen: undefined;
  RecentExpensesScreen: undefined;
  AllExpensesScreen: undefined;
};

const Stack = createNativeStackNavigator<NavParams>();
const BottomTabs = createBottomTabNavigator<NavParams>();

export type AppScreenProp = NativeStackNavigationProp<NavParams>;

function BottomTabsNav() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="RecentExpensesScreen"
        component={RecentExpensesScreen}
        options={{ headerTitle: "Recent Expenses" }}
      />
      <BottomTabs.Screen
        name="AllExpensesScreen"
        component={AllExpensesScreen}
        options={{ headerTitle: "All Expenses" }}
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
              name="TabsNavScreen"
              component={BottomTabsNav}
            />
            <Stack.Screen
              name="ManageExpenseScreen"
              component={ManageExpenseScreen}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
