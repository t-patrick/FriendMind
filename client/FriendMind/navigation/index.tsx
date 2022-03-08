import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import Friends from "../screens/Friends";
import Home from "../screens/Home";
import {
  RootDrawerParamList,
  RootStackParamList,
  User,
  UserContextType,
} from "../types";
import { navigationRef } from "./RootNavigation";
import Friend from "../components/Friend";
import AddEvent from "../components/AddEvent";
import AddFriend from "../components/AddFriend";

import { Drawer as PaperDrawer } from "react-native-paper";
import Login from "../screens/login";

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
);

export default function Navigation() {
  const [user, setUser] = React.useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserContext.Provider value={{ user, isLoggedIn, setIsLoggedIn }}>
        {isLoggedIn && <TopBar />}
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Drawer"
              component={Drawer}
              options={{ headerShown: false }}
            />
            <Stack.Group
              screenOptions={{ presentation: "modal", headerShown: false }}
            >
              <Stack.Screen name="Friend" component={Friend} />
              <Stack.Screen name="AddEvent" component={AddEvent} />
              <Stack.Screen name="AddFriend" component={AddFriend} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </SafeAreaView>
  );
}

function Drawer() {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Friends" component={Friends} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Item
        label="Home"
        icon="home"
        onPress={() => props.navigation.jumpTo("Home")}
        style={{ backgroundColor: "royalblue" }}
      />
      <PaperDrawer.Item
        style={{ backgroundColor: "royalblue", marginTop: 10 }}
        icon="account-group"
        label="Friends"
        onPress={() => props.navigation.jumpTo("Friends")}
      />
    </DrawerContentScrollView>
  );
}
