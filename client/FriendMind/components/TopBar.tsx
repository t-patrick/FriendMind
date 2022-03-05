import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper'
import { toggleDrawer } from '../navigation/RootNavigation';

function TopBar() {

/* 
  Want to disable hamburger menu showing on certain screens.
*/
const [burgerShowing, setBurgerShowing] = useState(true);

  return (
    <View>
    <Appbar.Header style={[styles.bar]}>
      {burgerShowing ? <Appbar.Action icon="menu" onPress={toggleDrawer}/> : <></> }
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

export default TopBar;