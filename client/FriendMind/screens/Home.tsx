import { useNavigation } from '@react-navigation/native'

import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Feather as DefaultFeather } from '@expo/vector-icons';
import MenuIcon from '../components/MenuIcon';

function Home() {
  
  const navigation = useNavigation();
  
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuIcon/>
    })
  })

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home