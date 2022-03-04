import React, {FC} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Headline, Paragraph } from 'react-native-paper'
import { Reminder } from '../types'

type ReminderProps = {
  reminder: Reminder
}

const formatMessage = (mode: string, firstName: string) => {
  switch (mode) {
  case 'Write': 
    return `Message ${firstName}`;
  case 'Meet':
    return `Meet up with ${firstName}`;
  case 'Talk': 
    return `Give ${firstName} a call!`
  }
}

const ReminderCard: FC<ReminderProps> = ({reminder}) => {
  const lastComm = reminder.lastComm;
  return (
    <View style={styles.card}>
    <Headline style={styles.name}>{formatMessage(lastComm.preference.mode, reminder.firstName)}</Headline>
    <Paragraph style={styles.para}>
      The last time was <Text style={{fontWeight: '700', fontSize: 20}}>{reminder.lastComm.lastCommunication.toDateString()}
      </Text> 
    </Paragraph>
  </View> 
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#3EB489',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Roboto'
  },
  para: {
    color: 'white',
    fontFamily: 'Roboto',
    flexShrink: 1,
    marginTop: 10,
    fontSize: 18
  }
});


/* 
  <View>
      <Text>{reminder.firstName}</Text>
      <Text>{reminder.lastName}</Text>
      <Text>{reminder.lastComm.preference.mode}</Text>
      <Text>{reminder.lastComm.lastCommunication.toDateString()}</Text>
    </View>
*/
export default ReminderCard;