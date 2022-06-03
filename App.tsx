import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";

import { Provider } from "react-redux";
import { store } from "./src/app/store";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AllDataScreen from "./src/screens/AllDataScreen";
import ExpesesScreen from "./src/screens/ExpensesScreen";
import ManageDataScreen from "./src/screens/ManageDataScreen";
import IncomesScreen from "./src/screens/IncomesScreen";
import AddButton from "./src/components/UI/AddButton";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export type NavParams = {
  AllDataScreen: undefined;
  ExpensesScreen: undefined;
  IncomesScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: {
    itemId?: string | null;
  };
};

const Stack = createNativeStackNavigator<NavParams>();
const BottomTabs = createBottomTabNavigator<NavParams>();

export type AppScreenProp = NativeStackNavigationProp<NavParams>;

function BottomTabsNav() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#002851",
        },
        headerTintColor: "white",
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#002851",
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: "#1979d3",
        tabBarInactiveTintColor: "white",
        headerRight: () => <AddButton />,
      }}
    >
      <BottomTabs.Screen
        name="AllDataScreen"
        component={AllDataScreen}
        options={{
          headerTitle: "Net Worth",
          tabBarLabel: "All",
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ExpensesScreen"
        component={ExpesesScreen}
        options={{
          headerTitle: "All Expenses",
          tabBarLabel: "Expenses",
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="money-off" size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="IncomesScreen"
        component={IncomesScreen}
        options={{
          headerTitle: "All Incomes",
          tabBarLabel: "Incomes",
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={24} color={color} />
          ),
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
          <StatusBar barStyle="light-content" backgroundColor="#002851" />
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="BottomTabsNav"
              component={BottomTabsNav}
            />
            <Stack.Screen
              name="ManageDataScreen"
              component={ManageDataScreen}
              options={{
                presentation: "modal",
                headerStyle: {
                  backgroundColor: "#002851",
                },
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
