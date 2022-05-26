import { NativeBaseProvider, StatusBar } from "native-base";

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
import AddButton from "./src/components/UI/AddButton";

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
          headerTitle: "All Expenses",
          tabBarLabel: "All",
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="RecentDataScreen"
        component={RecentDataScreen}
        options={{
          headerTitle: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <AntDesign name="back" size={24} color={color} />
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
              name="AddDataPointScreen"
              component={AddDataPointScreen}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
