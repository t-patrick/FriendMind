import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Reminder } from '../types';
import ReminderCard from './ReminderCard';


const mockReminders: Array<Reminder> = 
[
  {
    firstName: 'John',
    lastName: 'Smith',
    lastComm: {
      preference: {
        mode: 'Write', 
        timeUnit: 'Weeks',
        amount: 2
      },
      lastCommunication: new Date('4/4/2020')
    }
  },
  {
    firstName: 'Sally',
    lastName: 'McSally',
    lastComm: {
      preference: {
        mode: 'Meet', 
        timeUnit: 'Months',
        amount: 3
      },
      lastCommunication: new Date('10/4/2020')
    }
  },

]


function Remind() {

  const navigation = useNavigation();

  function testFetch () {
    console.log('In test fetch')
    fetch('http://10.0.2.2:3000/hello').then(res => res.json()).then(obj => {
      console.log('got the response', obj);
    }).catch(e => console.log(e));
  }


const [reminders, setReminders] = useState(mockReminders)


  return (
    <ScrollView style={styles.list}>
      {reminders.map(reminder => <ReminderCard reminder={reminder}/>)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
  }
});


/* 
  API
  Needs to get preferences for each friend
  For Each preference, get last communication from Communications table, or default to time they were added.
  - Need to add this to the friend table.
*/




/* 

*/


export default Remind;