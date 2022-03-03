import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Remind() {

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('AddFriend')}>
        <Text style={{fontSize: 26, fontFamily: 'Roboto'}}>
        Go to Add Friend
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddEvent', {location: 'London'})}>
        <Text style={{fontSize: 26, fontFamily: 'Roboto'}}>
        Go to Add Event
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Friend')}>
        <Text style={{fontSize: 26, fontFamily: 'Roboto'}}>
        Go to Friend
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Remind;