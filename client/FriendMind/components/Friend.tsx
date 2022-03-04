import React from 'react';
import { Text, View } from 'react-native';
import { FriendProps } from '../types';

function Friend({navigation, route}: FriendProps) {
  return (
    <View>
      <Text>Friend</Text>
    </View>
  )
}

export default Friend;