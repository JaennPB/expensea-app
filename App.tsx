import React from "react";
import { Alert } from "react-native";
import { NativeBaseProvider, StatusBar, View } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "./src/app/store";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useAppDispatch, useAppSelector } from "./src/hooks/reduxHooks";
import { authenticate } from "./src/app/mainSlice";

import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import AccountScreen from "./src/screens/AccountScreen";
import WelcomeScreen from "./src/screens/auth/WelcomeScreen";
import AllDataScreen from "./src/screens/AllDataScreen";
import ExpesesScreen from "./src/screens/ExpensesScreen";
import ManageDataScreen from "./src/screens/ManageDataScreen";
import IncomesScreen from "./src/screens/IncomesScreen";
import AddButton from "./src/components/UI/AddButton";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<NavParams>();
const BottomTabs = createBottomTabNavigator<NavParams>();
export type AppScreenProp = NativeStackNavigationProp<NavParams>;

function BottomTabsNav(): JSX.Element {
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
        headerTitleAlign: "left",
      }}
    >
      <BottomTabs.Screen
        name="AllDataScreen"
        component={AllDataScreen}
        options={{
          headerTitle: "Welcome!",
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
      <BottomTabs.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTitle: "Settings",
          tabBarLabel: "Account",
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={28} color={color} />
          ),
          headerRight: undefined,
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthNav(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function MainNav(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="BottomTabsNav"
        component={BottomTabsNav}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: "#002851",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
        name="ManageDataScreen"
        component={ManageDataScreen}
      />
    </Stack.Navigator>
  );
}

function AllNavs(): JSX.Element | null {
  const isAuth = useAppSelector((state) => state.isAuth);
  const userId = useAppSelector((state) => state.userId);
  const dispatch = useAppDispatch();
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function fetchUserId() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const userIdStorage = await AsyncStorage.getItem("userId");

        if (userIdStorage) {
          dispatch(authenticate(userIdStorage!));
        }
      } catch {
        Alert.alert("Something went wrong", "Please reload app");
      } finally {
        setAppIsReady(true);
      }
    }

    if (!isAuth && !userId) {
      fetchUserId();
    }
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#002851" />
      <View onLayout={onLayoutRootView} flex={1}>
        {!isAuth && <AuthNav />}
        {isAuth && <MainNav />}
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AllNavs />
      </NativeBaseProvider>
    </Provider>
  );
}
