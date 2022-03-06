import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Headline, List, Modal, Portal, TextInput } from 'react-native-paper';
import { addFriendNote } from '../api/FriendAPI';
import { FriendContext } from '../App';
import { Friend as FriendType, FriendProps } from '../types';

let count = 1; 


function Friend({navigation, route}: FriendProps) {

  const data = useContext(FriendContext);

  const [friendData, setFriendData] = useState<FriendType>();
  
  useEffect(() => {
    setFriendData(route.params.friend);
  }, [])
  

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white', padding: 20};
  const [noteValue, setNoteValue] = useState<string>('')

  const getColor = () => {
    count++;
    return count % 2 === 0 ? '#B6FA9E' : '#FCF9F9';
  }

  const handleAddNote = async () => {
    console.log(noteValue);
    // Make API call, post note
    // Update state, adding the returned note.

    const note = await addFriendNote(friendData!.id, {text: noteValue})

    const update: Array<FriendType> = [...data.allFriends];
    const fr = update.find(friend => friend.id === friendData!.id) as FriendType;
    if (!fr.notes) fr.notes = [];
    fr.notes.push(note);

    data.setAllFriends(update)
    
    hideModal();
    
  }

  function dayWithOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  if (friendData) {
    return (
      <ScrollView style={styles.container}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
            <Headline>Add note for {friendData!.firstName}</Headline>
            <TextInput mode='outlined' 
                      label='Note' 
                      onChangeText={(value) => setNoteValue(value)}
                      autoComplete={false}
                      style={{marginTop: 10}}/>
            <View style={styles.bottomButtons}>
              <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]} onPress={handleAddNote}>
                Add Note
              </Button>
              <Button mode="contained" style={styles.bottomButton} onPress={hideModal}>
                Cancel
              </Button>
            </View>
          </Modal>
        </Portal>
        <View style={styles.mainBox}>
          <Avatar.Image source={{uri: 'http://10.0.2.2:3000/image'}} size={160} style={styles.image}/>
          <Text style={styles.title}>{friendData.firstName} {friendData.lastName}</Text>
          <View style={styles.lastComms}>
            {friendData.lastComms.map(comm => 
              <Text style={{color: 'white'}}>
                Last {comm.preference.mode}: <Text style={{color: 'white', fontWeight: 'bold'}}>{new Date(comm.lastCommunication.date).toDateString()}</Text>
              </Text>
            )}
          </View>
          <View style={styles.noteBox}>
            <List.Accordion
              title="Don't forget:"
              >
              <Text style={{width: 300, backgroundColor: getColor(), padding: 10, fontSize: 18}}>Birthday: {dayWithOrdinal(friendData.birthDay)} {friendData.birthMonth}</Text>
              {friendData.notes?.map(note => { 
                return (
                  <Text style={{width: 300, backgroundColor: getColor(), padding: 10, fontSize: 18}}>{note.text}</Text>
                  )
                })}
                <Text style={{width: 300, backgroundColor: getColor(), padding: 10, fontSize: 18}}>
                <Button icon="plus" onPress={showModal}>
                  New
                </Button>
                </Text>
            </List.Accordion>
          </View>
        </View>
        <View>
          <Headline style={{marginLeft: 20, fontSize: 30, marginTop: 20}}>Past Meets:</Headline>
        </View>
      </ScrollView> 
    )
  } else {
    return <></>
  }
}




const styles = StyleSheet.create({
  mainBox: {
    marginLeft: 'auto', 
    marginRight: 'auto', 
    padding: 30,
    alignItems: 'center',
  }, 
  container: {

  },
  title: { 
    marginTop: 15,
    fontSize: 60,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  image: {

  },
  lastComms: {
    marginTop: 20,
    backgroundColor: '#3EB489',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    width: '80%'
  },
  noteBox: {
    marginTop: 30,
    width: 300,
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  bottomButton: {
    width: 150,
    backgroundColor: '#1685EC',
  },
  modalStyle: {
    backgroundColor: 'white', 
    padding: 20,
  }
});


export default Friend;