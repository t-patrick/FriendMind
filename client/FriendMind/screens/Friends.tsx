import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import MenuIcon from '../components/MenuIcon';

function Friends() {

  const navigation = useNavigation();

  useEffect(() => {
    console.log('hello from friends');
  },[])


  return (
    <Text>Friends</Text>
  )
}

export default Friends