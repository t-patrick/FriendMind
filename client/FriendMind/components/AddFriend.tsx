import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Headline, Subheading, TextInput, Modal, Portal, Button  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { AddFriendProps } from '../types';



function AddFriend({navigation, route}: AddFriendProps) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [open, setOpen] = useState(false);
  const [monthValue, setMonthValue] = useState('January');
  const [dayValue, setDayValue] = useState('1');
  const [dayError, setDayError] = useState(false)



  const [commPreferences, setCommPreferences] = useState<Array<CommPreference>>([]);  
  const [selectedMode, setSelectedMode] = useState<'Write' | 'Talk' | 'Meet'>('Meet')
  const [amount, setAmount] = useState('');
  const [timeUnit, setTimeUnit] = useState<'Days' | 'Weeks' | 'Months' | 'Years'>('Weeks');


  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};


  const setDay = (day:string) => {
    console.log(day);
    if (day === '') setDayValue('');
    if (day.length > 2 || !/^\d{1,2}$/.test(day)) return;
    setDayValue(day); 
    setDayError(!checkDayValid(parseInt(day), monthValue));
  }

  const setMonth = (month: string) => {
    setMonthValue(month)
    setDayError(!checkDayValid(parseInt(dayValue), month))
  }



  const addPreference = () => {
    const newState = [...commPreferences];

    const newPreference: CommPreference = {
      mode: selectedMode, 
      timeUnit: timeUnit,
      amount: parseInt(amount)
    } 

    newState.push(newPreference);
    setCommPreferences(newState);
    hideModal();
  }


  const handleAddFriend = () => {
    const friend: Friend = {
      firstName: firstName,
      lastName: lastName,
      birthDay: parseInt(dayValue),
      birthMonth: monthValue,
      commPreferences: commPreferences
    }

    console.log(friend);

    navigation.goBack();

  }


  return (
    <View style={{flex: 1, padding: 30}}>
      {/* <Text style={styles.header}>Add Friend</Text> */}
      <Headline style={styles.header}>Add Friend</Headline>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        autoComplete={false}
        style={styles.firstName}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        autoComplete={false}
      />
      <Subheading style={{marginTop: 20}}>Birthday:</Subheading>
      <View style={styles.birthday}>
        <TextInput
          label="Day"
          style={styles.day}
          value={dayValue}
          onChangeText={text => setDay(text)}
          autoComplete={false}
          error={dayError}
          keyboardType='numeric'/>
        <Picker 
          prompt='Month'
          selectedValue={monthValue}
          style={styles.month}
          onValueChange={(value, index) => setMonth(value)}>
          <Picker.Item label="January"  value="January"/>  
          <Picker.Item label="February" value="February"/> 
          <Picker.Item label="March"    value="March"/>    
          <Picker.Item label="April"    value="April"/>    
          <Picker.Item label="May"      value="May"/>      
          <Picker.Item label="June"     value="June"/>     
          <Picker.Item label="July"     value="July"/>     
          <Picker.Item label="August"   value="August"/>   
          <Picker.Item label="September" value="September"/>
          <Picker.Item label="October"  value="October"/>  
          <Picker.Item label="November" value="November"/> 
          <Picker.Item label="December" value="December"/> 
        </Picker>
      </View>
        <Subheading style={{marginTop: 30}}>Communication Preferences:</Subheading>
        <Button icon="plus" mode="contained" onPress={showModal}>
          Add Communication Preference
        </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={styles.commAdder}>
            <Text style={{fontSize: 26, marginBottom: 10}}>Add Preference: </Text>
            <View style={styles.meet}>
              <Subheading style={{fontSize: 18}}>I want to:</Subheading>
              <Picker
                selectedValue={selectedMode}
                onValueChange={(value, index) => setSelectedMode(value)}
                style={styles.modePicker}>
                <Picker.Item label="Meet" value="Meet"/>    
                <Picker.Item label="Write/Message"  value="Write_Message"/>  
                <Picker.Item label="Speak" value="Speak"/> 
              </Picker>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Subheading style={{fontSize: 18}}>Every:</Subheading>
            <TextInput
              label=""
              style={styles.amount}
              value={amount}
              onChangeText={text => setAmount(text)}
              autoComplete={false}
              keyboardType='numeric'/>
            <Picker
              selectedValue={timeUnit}
              onValueChange={(value, index) => setTimeUnit(value)}
              style={styles.timeunit}>
              <Picker.Item label="Days" value="Days"/>    
              <Picker.Item label="Weeks"  value="Weeks"/>  
              <Picker.Item label="Months" value="Months"/> 
              <Picker.Item label="Years" value="Years"/> 
            </Picker>
          </View>
            <View style={styles.bottomButtons}>
              <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]} onPress={addPreference}>
                Add
              </Button>
              <Button mode="contained" style={styles.bottomButton} onPress={hideModal}>
                Cancel
              </Button>
            </View> 
        </Modal>
      </Portal>

      <View>
        {commPreferences.map(comm => <Text key={comm.mode + comm.amount}>{comm.mode} every {comm.amount} {comm.timeUnit}</Text>)}
      </View>

      <View style={styles.bottomButtons}>
        <Button mode="contained" style={[styles.bottomButton, {marginRight: 20}]} onPress={handleAddFriend}>
          Add Friend
        </Button>
        <Button mode="contained" style={styles.bottomButton} onPress={navigation.goBack}>
          Back
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    fontSize: 28
  },
  firstName: {
    marginBottom: 20
  },
  birthday: {
    flexDirection: 'row',
    marginTop: 5,
  },
  commAdder: {
    marginTop: 5,
  },
  meet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  modePicker: {
    width: 180,
    height: 30,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  month: {
    width: '50%',
    height: '100%'
  },
  day: {
    flex: 1,
    width: 40
  },
  amount: {
    width: '20%',
    height: 50,
    marginLeft: 20
  },
  timeunit: {
    width: 150,
    marginLeft: 30,
    backgroundColor: 'rgba(0,0,0,0.05)'
  }, 
  buttons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    width: '50%',
    justifyContent: 'space-between'
  },
  bottomButtons: {
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
  },
  bottomButton: {
    width: 150,
    backgroundColor: '#1685EC'
  }
})

const checkDayValid = (day: number, month: string) => {
    
  if (Number.isNaN(day) || day < 1 || day > 31) return false; 

  const thirtyOne = [
    'January',
    'March',
    'May',
    'July',
    'August',
    'October',
    'December'
  ];

  if (month === 'February') {
    return day > 29 ? false : true
  }
  
  if (thirtyOne.includes(month)) return true;

  return day > 30 ? false : true;
}

type CommPreference = {
  mode: 'Write' | 'Talk' | 'Meet';
  timeUnit: 'Days' | 'Weeks' | 'Months' | 'Years';
  amount: number;
}

type Friend = {
  firstName: string,
  lastName: string, 
  birthDay: number,
  birthMonth: string,
  commPreferences: Array<CommPreference>
}


export default AddFriend