import React from 'react'
import { Feather as DefaultFeather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MenuIcon () {

  const navigation = useNavigation();

  const openMenu = () => {
    navigation.navigate('Friends');
  }

  return (
    <TouchableOpacity onPress={openMenu}>
      <DefaultFeather name="menu" size={35}/>
    </TouchableOpacity>
  )
}

export default MenuIcon