import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper'
import App from '../App';
import { generateBoxShadowStyle } from '../helpers/shadows';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { navigate, toggleDrawer } from '../navigation/RootNavigation';

function TopBar() {

  
  
  return (
    <View>
    <Appbar.Header style={[styles.bar]}>
      <Appbar.Action icon="menu" onPress={toggleDrawer}/>
      <Logo/>
    </Appbar.Header>
    </View>
  )
}

const Logo = () => {
  return (
    <Image
        style={styles.logo}
        source={require('../assets/images/fm.png')}
      />
  )
}

// const shadowStyle = generateBoxShadowStyle(0, 2, 'black', 0.4, 0, 5, 'black');

const styles = StyleSheet.create({
  bar: {
    height: 50,
    marginTop: -15,
    backgroundColor: 'white',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,

  },
  logo: {
    height: 50,
    width: 50,
    resizeMode:'contain',
    marginLeft: 'auto',
    marginRight: 10
  },
});

export default TopBar