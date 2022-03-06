import React, { useState } from 'react';
import { Button, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imga = require('../assets/images/reminisce-splash.jpg')
import * as ImagePicker from 'expo-image-picker';

/* 
  Will be: A selection of previous meetings with friends. 

  Currently: Using to testing image upload.
  Not working yet.
*/

function Reminisce() {
  const [image, setImage] = useState<ImagePicker.ImageInfo>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      noData: true
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const createFormData = (photo: ImagePicker.ImageInfo | undefined) => {
    const data = new FormData();
  
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-nocheck
    data.append('photo', photo);
  
    // Object.keys(body).forEach((key) => {
    //   data.append(key, body[key]);
    // });
  
    return data;
  };

  const handleUploadPhoto = () => {
    fetch('http://10.0.2.2:3000/sendimage', {
      method: 'POST',
      body: createFormData(image),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };



  return (
    <ImageBackground source={imga} resizeMode="cover" style={styles.image}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Upload" onPress={handleUploadPhoto} />
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
    </View>
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