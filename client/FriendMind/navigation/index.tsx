import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';
import Friends from '../screens/Friends';
import Home from '../screens/Home';
import { RootDrawerParamList, RootStackParamList } from '../types';
import { navigationRef } from './RootNavigation';
import Friend from '../components/Friend';
import AddEvent from '../components/AddEvent';
import AddFriend from '../components/AddFriend';

import { Drawer as PaperDrawer } from 'react-native-paper';

export default function Navigation() {
  

  const Stack = createNativeStackNavigator<RootStackParamList>();
  


  /* NAVIGATION HIERARCHY 
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
            <Stack.Screen name="AddEvent" component={AddEvent}/>
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

