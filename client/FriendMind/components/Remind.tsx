import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Remind() {

  const navigation = useNavigation();

  // React.useEffect(() => {
  //   fetch('http://localhost:3000/hello').then(res => console.log(res)).catch(e => console.log(e));
 
  // }, [])

  function testFetch () {
    console.log('In test fetch')
    fetch('http://10.0.2.2:3000/hello').then(res => res.json()).then(obj => {
      console.log('got the response', obj);
    }).catch(e => console.log(e));
  }

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