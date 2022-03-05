import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from '../types';
import Remind from '../components/Remind';
import Reminisce from '../components/Reminisce';

/* TODO
  Add custom content components for Remind and Reminise buttons
*/

function Home() {

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

export default Home;