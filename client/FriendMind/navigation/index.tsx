/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation, useNavigationContainerRef, DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, ScrollView, ScrollViewProps, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuIcon from '../components/MenuIcon';
import TopBar from '../components/TopBar';

import Friends from '../screens/Friends';
import Home from '../screens/Home';

import { RootDrawerParamList, RootStackParamList } from '../types';
import { DrawerActions } from '@react-navigation/native';

import { navigationRef } from './RootNavigation';
import { createURL } from 'expo-linking';
import Friend from '../components/Friend';
import AddEvent from '../components/AddEvent';
import AddFriend from '../components/AddFriend';
import { DrawerNavigationHelpers, DrawerDescriptorMap } from '@react-navigation/drawer/lib/typescript/src/types';

import { Drawer as PaperDrawer } from 'react-native-paper';

export default function Navigation() {
  

  const Stack = createNativeStackNavigator<RootStackParamList>();
  


/* 
Stack
  Drawer
    Home (Tab)
      Remind
      Reminsce
    Friends
      Add Friend (modal)
  Friend
*/
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar/>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Drawer" component={Drawer} options={{headerShown: false}}/>
          <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
            <Stack.Screen name="Friend" component={Friend}/>
            <Stack.Screen name="AddEvent" initialParams={{location: 'Dunno'}} component={AddEvent}/>
            <Stack.Screen name="AddFriend" component={AddFriend}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );

}


function Drawer() {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props}/>} screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Friends" component={Friends}/>
    </Drawer.Navigator>
  )
}

function CustomDrawerContent(props: any) {
  console.log(props.state.routeNames)
  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Item label="Home" icon="home" onPress={() => props.navigation.jumpTo('Home')} style={{backgroundColor: 'royalblue'}}/>
      <PaperDrawer.Item
        style={{ backgroundColor: 'royalblue', marginTop: 10}}
        icon="account-group"
        label="Friends"
        onPress={() => props.navigation.jumpTo('Friends')} 
   />
    </DrawerContentScrollView>
  );
}


// const Stack = createNativeStackNavigator<RootStackParamList>();


// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
    
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
