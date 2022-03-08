import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Appbar, Button, Headline, TextInput } from 'react-native-paper'
import { AddEventProps } from '../types'
import DateTimePicker from '@react-native-community/datetimepicker';
import { postEvent } from '../api/FriendAPI';

/* 
  Need to create this.
*/

function AddEvent({navigation, route}: AddEventProps) {

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const onSubmit = async () => {
    const event = await postEvent(route.params.communication.id as number, {
      title,
      location
    });

    navigation.goBack();
  }

  return (
<View style={{flex: 1, padding: 30}}>
      {/* <Text style={styles.header}>Add Friend</Text> */}
      <Headline style={styles.header}>Add Event</Headline>
      <TextInput
        label="Title"
        autoComplete={false}
        style={styles.input}
        selectionColor='black'
        value={title}
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        label="Location"
        placeholderTextColor='black'
        autoComplete={false}
        style={styles.input}
        value={location}
        onChangeText={value => setLocation(value)}
      />
  
      <View style={styles.bottomButtons}>
        <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]} onPress={onSubmit}>
          Add
        </Button>
        <Button mode="contained" style={styles.bottomButton}>
          Cancel
        </Button>
      </View>
</View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    fontSize: 28,
    color: 'black',
    fontFamily: 'Manrope_400Regular'
  },
  input: {
    marginBottom: 20,
    fontFamily: 'Manrope_400Regular'
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 60,
    fontFamily: 'Manrope_400Regular'
  },
  bottomButton: {
    width: 120,
    backgroundColor: '#1685EC',
  }
})

export default AddEvent;