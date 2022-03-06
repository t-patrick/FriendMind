import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Appbar, Button, Headline, TextInput } from 'react-native-paper'
import { AddEventProps } from '../types'
import DateTimePicker from '@react-native-community/datetimepicker';

/* 
  Need to create this.
*/

function AddEvent({navigation, route}: AddEventProps) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  
  const onChange = (event: any, selectedDate?: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSubmit = () => {

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
      />
      <TextInput
        label="Location"
        placeholderTextColor='black'
        autoComplete={false}
        style={styles.input}
      />
      <TextInput
        disabled
        label="Date"
        value={date.toDateString()}
        placeholderTextColor='black'
        autoComplete={false}
        style={styles.input}
      />
      <View>
        <View>
          <Button onPress={showDatepicker}>Add Date</Button>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            display="default"
            mode= 'date'
            onChange={onChange}
          />
        )}
    </View>
  
      <View style={styles.bottomButtons}>
        <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]}>
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
    color: 'black'
  },
  input: {
    marginBottom: 20,
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 60,
  },
  bottomButton: {
    width: 120,
    backgroundColor: '#1685EC',
  }
})

export default AddEvent;