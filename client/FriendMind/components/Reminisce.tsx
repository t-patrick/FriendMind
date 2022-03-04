import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
const image = require('../assets/images/reminisce-splash.jpg')

function Reminisce() {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text>Reminisce</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

export default Reminisce;