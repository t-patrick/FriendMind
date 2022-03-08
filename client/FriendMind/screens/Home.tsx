import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from '../types';
import Remind from '../components/Remind';
import Reminisce from '../components/Reminisce';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/* TODO
  Add custom content components for Remind and Reminise buttons
*/

function Home() {
  const BottomTab = createMaterialBottomTabNavigator<HomeTabParamList>(); 

  return (
    <BottomTab.Navigator barStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}} activeColor='#3EB489'>
      <BottomTab.Screen 
        name="Remind"
        component={Remind}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26}/>),
        }}
      />
      <BottomTab.Screen 
        name="Reminisce"
        component={Reminisce}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="palm-tree" color={color} size={26}/>),
        }}
      />
    </BottomTab.Navigator>
  )
}

export default Home;