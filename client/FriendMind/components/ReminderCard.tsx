import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, {FC, useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button as NativeButton } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Divider, Headline, Menu, Modal, Paragraph, Portal } from 'react-native-paper'
import { FriendContext } from '../App'
import { Friend, FriendProps, NavigationProps, ReminderProps, RootStackParamList } from '../types'



const ReminderCard: FC<ReminderProps> = ({reminder}) => {

  const navigation = useNavigation<NavigationProps>()

  const { allFriends } = useContext(FriendContext);


  const lastComm = reminder.lastComm;
 
  
  const [visible, setVisible] = useState(false); 

  const openMenu = () => {
    setVisible(true);
  }
  
  const closeMenu = () => {
    setVisible(false);
  }

  const goToFriend = () => {
    const friendData = allFriends.find(item => item.id === reminder.friendId) as Friend;
    navigation.navigate('Friend', {friend: friendData});
  }

  const formatDate = () => {
    return new Date(lastComm.lastCommunication.date).toDateString();
  }

  const onDone = () => {
    // Add communication to database.
    // Need to get the id back.
    closeMenu();
    setModalVisible(true);
  }

  const addEventHandle = () => {
    // If the event isn't meet, popup with 'Communication Added!'
    // If it is, popup with the option to add event.
      // Add event page - passing on the communication and the friend
      // If 'Later' - Exit modal. Will have option to add details on event section of friend.



    hideModal();
    navigation.navigate('AddEvent');
  }

  useEffect(() => {
    console.log(reminder);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};


  const conditionalDoneRender = () => {
    if (reminder.lastComm.preference.mode === 'Meet') {
      return (
        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View>
              <Headline style={{textAlign: 'center'}}>Great!</Headline>
              <View style={styles.bottomButtons}>
              <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]} onPress={addEventHandle}>
                Add Event
              </Button>
              <Button mode="contained" style={styles.bottomButton} onPress={hideModal}>
                Later
              </Button>
            </View> 
            </View>
          </Modal>
        </Portal>
        )
    } else {
      return (

        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View>
              <Headline style={{textAlign: 'center'}}>Great! Communication Added</Headline>
              <View style={[styles.bottomButtonsOther]}>
              <Button mode="contained" style={styles.bottomButtonOther} onPress={hideModal}>
                Close 
              </Button>
            </View> 
            </View>
          </Modal>
        </Portal>
      )
    }
  }

  const renderCard = () => {
    return(
      <TouchableOpacity onPress={openMenu}>
        {conditionalDoneRender()}
        <View style={styles.card}>
          {formatMessage(
              lastComm.lastCommunication.type,
              lastComm.preference.mode, 
              reminder.firstName)}
          <Paragraph style={styles.para}>
            The last time was 
            <Text style={{fontWeight: '700', fontSize: 20}}>
              {lastComm.lastCommunication.type === 'Added' ? ' Not since adding' : formatDate()}
              </Text> 
          </Paragraph>
        </View> 
      </TouchableOpacity>
    )
  }
 
  return reminder ? (
    <View>
    <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={renderCard()}
        >
        <Menu.Item onPress={() => onDone()} 
                   title="Done!" />
        <Divider/>
        <Menu.Item onPress={goToFriend} title="View Friend" />
        <Divider/>
        <Menu.Item onPress={() => console.log('dismiss')} title="Dismiss" />
      </Menu>
  </View> ) : <></>
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
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
  },
  bottomButtonsOther: {
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
  bottomButton: {
    width: 150,
    backgroundColor: '#1685EC',
  },
  bottomButtonOther: {
    backgroundColor: '#1685EC',
    width: 100,
    height: 40
  }
});

/* 
  Make reminder message pretty
  TODO add variations to messages, maybe depending on how long it has been. 
*/
const formatMessage = (lastCommType: string, preferredMode: string, firstName: string) => {
  switch (preferredMode) {
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
  case 'Speak': 
    return <Headline style={styles.name}>Give {firstName} a call!</Headline>
  }
}



export default ReminderCard;