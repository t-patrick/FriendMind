import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';

const FriendCard: FC<FriendCardProps> = (props) => {


  const { friend } = props;

  return (
    <View style={styles.card}>
      <Headline style={styles.name}>{friend.firstName} {friend.lastName}</Headline>
      <Paragraph style={styles.para}><Text style={{fontWeight: '700'}}>Last Seen:</Text> {friend.lastSeen.toDateString()}</Paragraph>
    </View> 
  )
}

type FriendForCard = {
  firstName: string,
  lastName: string;
  lastSeen: Date;
}

interface FriendCardProps {
  friend: FriendForCard
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#3EB489',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Roboto'
  },
  para: {
    color: 'white',
    fontFamily: 'Roboto',
    flexShrink: 1,
    width: 80
  }


})


export default FriendCard;