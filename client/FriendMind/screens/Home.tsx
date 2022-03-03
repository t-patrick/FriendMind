import { NavigationContainer, useNavigation } from '@react-navigation/native'

import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Feather as DefaultFeather } from '@expo/vector-icons';
import MenuIcon from '../components/MenuIcon';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from '../types';
import Remind from '../components/Remind';
import Reminisce from '../components/Reminisce';

function Home() {

  const navigation = useNavigation();
  const BottomTab = createBottomTabNavigator<HomeTabParamList>(); 

  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen 
        name="Remind"
        component={Remind}
      />
      <BottomTab.Screen 
        name="Reminisce"
        component={Reminisce}
      />
    </BottomTab.Navigator>
  )
}

    // <View style={{flex: 1}}>
    //   <Text>Hello</Text>
    // </View>
export default Home