import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform,  } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Headline, List, Modal, Paragraph, Portal, TextInput, RadioButton } from 'react-native-paper';
import { addFriendNote, getEvents, postCommunication, postEvent} from '../api/FriendAPI';
import { FriendContext } from '../App';
import { Communication, Friend as FriendType, FriendProps, FullEvent } from '../types';
import DateTimePicker from '@react-native-community/datetimepicker';


let count = 1; 

type CommType = "Meet" | "Write" | "Talk" | "Added"

function Friend({navigation, route}: FriendProps) {
  
  const data = useContext(FriendContext);
  
  const [events, setEvents] = useState<Array<FullEvent>>([]);
  const [friendData, setFriendData] = useState<FriendType>();
  const [currentModal, setCurrentModal] = useState('')
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [commValue, setCommValue] = useState<"Meet" | "Write" | "Talk" | "Added">('Meet');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [currentEvent, setCurrentEvent] = useState<FullEvent>();
  
  useEffect(() => {
    setFriendData(route.params.friend);
    updateEvents();
  }, []);

  useEffect(() => {
    setDate(new Date(Date.now()));
  }, [])

  const updateEvents = async () => {
    const evs = await getEvents(route.params.friend.id);
    console.log('====================================');
    console.log(evs);
    console.log('====================================');
    setEvents(evs);
  };
  

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white', padding: 20};
  const [noteValue, setNoteValue] = useState<string>('note')

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


  const addCommunication = async () => {
    const comm = await postCommunication(friendData?.id as number, {
      date: date,
      type: commValue,
    });

    const newEvent: FullEvent = comm;

    const newEvents = [...events, newEvent];
    newEvents.sort((a,b) => new Date(a.communication.date).getTime() - new Date(b.communication.date).getTime());

    setEvents(newEvents);

    hideModal();
    // Need to trigger a refetch. Or fetch one friend as update state.
  }

  const addEvent = async () => {
    const comm = await postCommunication(friendData?.id as number, {
      date: date,
      type: commValue,
    });

    const event = await postEvent(comm.id, {
      location: location, 
      title: title
    });

    hideModal();
    updateEvents();
  }

  const postUpdateEvent = async () => {
    const comm = currentEvent?.communication as Communication;
    const id = comm.id as number;

    const event = await postEvent(id, {
      location: location, 
      title: title
    });

    hideModal();
    setTitle('');
    setLocation('');
    setDate(new Date())
    updateEvents();
  }



    // const addEventDetailsforComm = async (ev: FullEvent) => {
    //   const event = await postEvent(ev);

    // }

  /* 
  /// DATEPICKER
  */


  const containerStyle = {backgroundColor: 'white', padding: 20};


  const changeCommValue = (value: string) => {
    const val = value as CommType
    setCommValue(val);
  }
  
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

  const renderDatePicker = (ev?: FullEvent) => {

    const dateForPicker = ev !== undefined ? new Date(ev.communication.date) : date as Date

    return (
      <View>
        <View>
          <Button onPress={showDatepicker}>Add Date</Button>
        </View>
        <TextInput
          disabled
          label="Date"
          value={dateForPicker.toDateString()}
          placeholderTextColor='black'
          autoComplete={false}
          style={{marginTop: 10, marginBottom: 20}}
        />
        { show && (
          <DateTimePicker
          testID="dateTimePicker"
          value={dateForPicker}
          display="default"
          mode= 'date'
          onChange={onChange}
          />
          )
        }
    </View>
    )
  }


  const renderModal = () => {
    if (currentModal === 'note') {
      return (
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
    )
    }

    if (currentModal === 'comm') {
      return (

      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Headline style={{marginBottom: 30}}>Add Communication</Headline>
          <View>
            <RadioButton.Group onValueChange={(newValue) => changeCommValue(newValue)} value={commValue}>
            <View>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              <RadioButton value="Meet" />
              <Text>Meet</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              <RadioButton value="Speak" />
              <Text>Speak</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              <RadioButton value="Event" />
              <Text>Event</Text>
            </View>
          </View>
          </RadioButton.Group>
          {renderDatePicker()}
          <View style={styles.bottomButtons}>
            <Button mode="contained" style={styles.bottomButton} onPress={addCommunication}>
              Add
            </Button>
            <Button mode="contained" style={[styles.bottomButton, {marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#EC163C'}]} onPress={hideModal}>
              Cancel
            </Button>
          </View> 
        </View>
    </Modal>
    )
    }
    if (currentModal === 'event'  || currentModal === 'updateEvent') {
      return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Headline>Add Event</Headline>
        {currentModal === 'updateEvent' ? renderDatePicker(currentEvent) : renderDatePicker}
        <TextInput
          label="Title"
          autoComplete={false}
          style={[styles.input, {marginTop: 30}]}
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
          {currentModal === 'event' ? 
            <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]} onPress={addEvent}>Add</Button>
          :
            <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]} onPress={postUpdateEvent}>Add</Button>
          }
          <Button mode="contained" style={styles.bottomButton} onPress={hideModal}>
            Cancel
          </Button>
        </View>
      </Modal>
    )
    }
    
  }

  const setModal = (type: string) => {
    setCurrentModal(type);
    showModal();
  }

  const updateEvent = (ev: FullEvent) => {
    setCurrentEvent(ev);
    setCurrentModal('updateEvent')
    showModal();
  }



  const renderEvent = (ev: FullEvent) => {
    
    console.log(ev);
    
    return ev.event ? (
    <TouchableOpacity>
      <View style={styles.card}>
        <Paragraph style={styles.para}>
          You saw {friendData?.firstName} on {new Date(ev.communication.date).toDateString()}
        </Paragraph>
          <Text style={styles.name}>
             "{ev.event.title}"
          </Text> 
        <Paragraph style={styles.para}>
          at {ev.event.location}
        </Paragraph> 
      </View> 
    </TouchableOpacity>
    ) : 
    <View style={[styles.card, {backgroundColor: '#1685EC'}]}>
      <Text style={styles.para}>You met on { new Date(ev.communication.date).toDateString() }</Text> 
      <Text style={styles.para}>You haven't added details yet</Text>
        <Button onPress={() => updateEvent(ev)}>Add Details</Button>
    </View>
  }

  if (friendData) {
    return (
      <ScrollView style={styles.container}>
        <Portal>
          {renderModal()}
        </Portal>
        <View style={styles.mainBox}>
          <Avatar.Image source={{uri: friendData.profilePictureUrl || 'http://10.0.2.2:3000/image'}} size={160} style={styles.image}/>
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
                <Button icon="plus" onPress={() => setCurrentModal('note')}>
                  New
                </Button>
                </Text>
            </List.Accordion>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
            <Button onPress={() => setModal('comm')}>Add Communication</Button>
            <Button onPress={() => setModal('event')}>Add Event</Button>
          </View>
        </View>
          <Headline style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 30, marginTop: 10, }}>Past Meets:</Headline>
        <View>
          <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30, width: '80%'}}>
            {events && (events.map(ev => renderEvent(ev)))}
          </View>
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
  },
  card: {
    marginBottom: 40,
    width: '100%',
    backgroundColor: 'rgba(62, 180, 137, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
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
  header: {
    marginBottom: 20,
    fontSize: 28,
    color: 'black'
  },
  input: {
    marginBottom: 20,
  },
});


export default Friend;