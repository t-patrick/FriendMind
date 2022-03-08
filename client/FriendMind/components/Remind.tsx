import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FriendContext } from '../App';
import { Friend as FriendType, Reminder } from '../types';
import ReminderCard from './ReminderCard';
import { DurationInputArg1, DurationInputArg2 } from 'moment';
import { Headline } from 'react-native-paper';
import Friend from './Friend';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const splash = require('../assets/images/friendsplash.jpg')


// const mockReminders: Array<Reminder> = 
// [
//   {
//     friendId: 1,
//     firstName: 'John',
//     lastName: 'Smith',
//     lastComm: {
//       preference: {
//         mode: 'Write', 
//         timeUnit: 'Weeks',
//         amount: 2
//       },
//       lastCommunication: new Date('4/4/2020')
//     }
//   },
//   {
//     friendId: 2,
//     firstName: 'Beth',
//     lastName: 'Lee',
//     lastComm: {
//       preference: {
//         mode: 'Talk', 
//         timeUnit: 'Months',
//         amount: 3
//       },
//       lastCommunication: new Date('10/4/2020')
//     }
//   },
// ]

type Birthday = {
  friend: FriendType,
  date: Date
}


function Remind() {

  const navigation = useNavigation();
  const { allFriends } = useContext(FriendContext);
  const [reminders, setReminders] = useState<Array<Reminder>>()
  const [birthdays, setBirthdays] = useState<Array<Birthday>>()


  useEffect(() => {
    // Turn Friend Preferences into Reminders.
    // Filter them by comparing preferences to last communication.
    
    const reminds: Array<Reminder> = [];
    allFriends.length > 0 &&  
      allFriends.forEach(friend => {
        friend.lastComms.forEach(comm => {
          const lastComm = moment(comm.lastCommunication.date)
          const amount = comm.preference.amount as DurationInputArg1
          const unit = comm.preference.timeUnit[0].toLowerCase() as DurationInputArg2
          const cutoff = lastComm.add(amount, unit);
          if (Date.now() > cutoff.valueOf()) reminds.push({
            friendId: friend.id,
            firstName: friend.firstName,
            lastName: friend.lastName,
            lastComm: comm
          })
        })
      });

      const bdays: Array<Birthday> = allFriends.map(friend => {
        const birthday = moment(friend.birthMonth + ' ' + friend.birthDay + ' ' + new Date().getFullYear());
        return {
          friend: friend,
          date: birthday.toDate()
        }
        }).filter(b => {
          const difference = moment(b.date).diff(new Date(), 'days');
          if (difference > 0 && difference < 8) return true;
          return false;
        });
    
    setBirthdays(bdays);
    setReminders(reminds);
  
  
  }, [allFriends])
  



    return reminders ? (
      <ImageBackground source={splash} resizeMode="cover" style={styles.image}>
    <ScrollView style={styles.list}>
      <View style={{width: '100%', 
                    backgroundColor: 'transpar', 
                    borderRadius: 10,
                    padding: 20,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center'}}>
        <Headline style={{color: 'white', fontSize: 28, marginBottom: 20}}>Upcoming Birthdays:</Headline>
        <View style={{width: '100%', alignItems: 'center'}}>
        {birthdays?.map(birthday => <Text style={{color: 'white', 
                                                  fontSize: 18,
                                                  backgroundColor: 'rgba(22, 133, 236, 0.8)',
                                                  padding: 15,
                                                  borderRadius: 15,
                                                  elevation: 1,
                                                  width: '100%',
                                                  textAlign: 'center',
                                                  marginBottom: 10
                                                  }}>
          {birthday.friend.firstName} {birthday.friend.lastName}: {birthday.date.toDateString()}
          </Text>)}
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Headline style={{color: 'white', fontSize: 28, marginBottom: 20}}>Reminders:</Headline>
        {reminders.map(reminder => <ReminderCard key={reminder.friendId} reminder={reminder}/>)}
      </View>
    </ScrollView>
    </ImageBackground>
    ) : ( <Text>You are all up to date with your friends!</Text> )

}

const styles = StyleSheet.create({
  list: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
  },
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


/* 
  API
  Needs to get preferences for each friend
  For Each preference, get last communication from Communications table, or default to time they were added.
  - Need to add this to the friend table.
  
  function testFetch () {
    console.log('In test fetch')
    fetch('http://10.0.2.2:3000/hello').then(res => res.json()).then(obj => {
      console.log('got the response', obj);
    }).catch(e => console.log(e));
  }
*/



export default Remind;