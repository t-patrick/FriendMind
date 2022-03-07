import React, { useState } from 'react';
import { Button, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imga = require('../assets/images/reminisce-splash.jpg')
import * as ImagePicker from 'expo-image-picker';

/* 
  Will be: A selection of previous meetings with friends. 

  Currently: Using to testing image upload.
  Not working yet.
*/

function Reminisce() {
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Avatar.Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );

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
  }
});

/* 
    <ImageBackground source={imga} resizeMode="cover" style={styles.image}>
*/

export default Reminisce;