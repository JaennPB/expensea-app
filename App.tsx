import { NativeBaseProvider, StatusBar, View } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { authenticate } from "./src/app/mainSlice";
import { store } from "./src/app/store";
import { useAppDispatch, useAppSelector } from "./src/hooks/reduxHooks";

import AddButton from "./src/components/AddButton";
import AccountScreen from "./src/screens/AccountScreen";
import AllDataScreen from "./src/screens/AllDataScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import WelcomeScreen from "./src/screens/auth/WelcomeScreen";
import ExpesesScreen from "./src/screens/ExpensesScreen";
import IncomesScreen from "./src/screens/IncomesScreen";
import ManageDataScreen from "./src/screens/ManageDataScreen";

import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Stack = createNativeStackNavigator<NavParams>();
const BottomTabs = createBottomTabNavigator<NavParams>();

function BottomTabsNav() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#002851",
        },
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "Poppins_600SemiBold",
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
          tabBarLabel: "All",
          tabBarLabelStyle: { fontSize: 13, fontFamily: "Poppins_400Regular" },
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
          headerTitle: "Account Settings",
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

function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function MainNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="BottomTabsNav"
        component={BottomTabsNav}
      />
      <Stack.Screen
        options={{
          presentation: "fullScreenModal",
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

function AllNavs() {
  const dispatch = useAppDispatch();

  const [appIsReady, setAppIsReady] = useState(false);

  const isAuth = useAppSelector((state) => state.isAuth);
  const userId = useAppSelector((state) => state.userId);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    async function fetchUserId() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const userIdStorage = await AsyncStorage.getItem("userIdExpensea");

        if (userIdStorage) {
          dispatch(authenticate(userIdStorage!));
        }
      } catch {
        Alert.alert("Something went wrong.", "Please reload app.");
      } finally {
        setAppIsReady(true);
      }
    }

    if (!isAuth && !userId) {
      fetchUserId();
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#002851" />
      <View onLayout={onLayoutRootView} flex={1}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {!isAuth && <AuthNav />}
          {isAuth && <MainNav />}
        </GestureHandlerRootView>
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
