import React from 'react';
import { Text, View } from 'react-native';
import { Friend as FriendType, FriendProps } from '../types';

function Friend({navigation, route}: FriendProps) {
  const friendData: FriendType = route.params.friendData;
  return (
    <View>
      <Text>{friendData.firstName}</Text>
      <Text>{friendData.lastName}</Text>
        {friendData.lastComms.map(comm => 
          <Text key={friendData.firstName}>{comm.lastCommunication.toDateString()}</Text>)}
    </View>
  )
}

export default Friend;