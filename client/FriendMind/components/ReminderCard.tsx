import { useNavigation, useNavigationState } from '@react-navigation/native'
import React, {FC, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Divider, Headline, Menu, Paragraph } from 'react-native-paper'
import { Friend, Reminder } from '../types'

type ReminderProps = {
  reminder: Reminder
}

const formatMessage = (mode: string, firstName: string) => {
  switch (mode) {
  case 'Write': 
    return (
    <Headline style={styles.name}>
      <Text style={{fontSize: 34, fontWeight: '600'}}>Message </Text> 
      <Text>{firstName}</Text>
    </Headline>
    )
  case 'Meet':
    return (
      <Headline style={styles.name}>
        <Text style={{fontSize: 34, fontWeight: '600'}}>Meet up with </Text> 
        <Text>{firstName}</Text>
      </Headline>
      )
  case 'Talk': 
    return <Headline style={styles.name}>Give {firstName} a call!</Headline>
  }
}

const ReminderCard: FC<ReminderProps> = ({reminder}) => {

  const navigation = useNavigation()

  const mockFriendOpen = () => {

    const friendData: Friend = {
      firstName: 'Beth',
      lastName: 'Lee',
      birthDay: 2,
      birthMonth: 'March',
      lastComms: [
        {
          preference: {
            mode: 'Write',
            timeUnit: 'Days', 
            amount: 4
          },
          lastCommunication: new Date('3/3/2022')
        },
        {
          preference: {
            mode: 'Meet',
            timeUnit:  'Weeks',
            amount: 2
          },
          lastCommunication: new Date('2/20/2022')
        }
      ],
      notes: [
        'She is the best',
        'Don\'t leave it too long'
      ]
    }
    closeMenu()

    navigation.navigate('Friend', {friendData: friendData})
  }
  const lastComm = reminder.lastComm;
 
  const [visible, setVisible] = useState(false); 

  const openMenu = () => {
    setVisible(true);
  }
  
  const closeMenu = () => {
    setVisible(false);
  }


  const renderCard = () => {
    return(
      <TouchableOpacity onPress={openMenu}>
        <View style={styles.card}>
          {formatMessage(lastComm.preference.mode, reminder.firstName)}
          <Paragraph style={styles.para}>
            The last time was <Text style={{fontWeight: '700', fontSize: 20}}>{reminder.lastComm.lastCommunication.toDateString()}
            </Text> 
          </Paragraph>
        </View> 
      </TouchableOpacity>
    )
  }
 
  return (
    <View style={{backgroundColor: 'rgba(0,0,0,0)', margin: 0}}>
    <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={renderCard()}
        >
        <Menu.Item 
                   onPress={() => {}} 
                   title="Done!" />
        <Divider/>
        <Menu.Item onPress={mockFriendOpen} title="View Friend" />
        <Divider/>
        <Menu.Item onPress={() => {}} title="Dismiss" />
      </Menu>
  </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 40,
    width: '100%',
    backgroundColor: 'rgba(62, 180, 137, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 1
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


export default ReminderCard;