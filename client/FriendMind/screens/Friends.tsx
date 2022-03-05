import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, FAB, Headline, Searchbar } from 'react-native-paper';
import FriendCard from '../components/FriendCard';
import { FriendForCard, FriendsProps } from '../types';

function Friends({navigation, route}: FriendsProps) {


  /*///////////////////
    STATE
  *////////////////////
  const mockFriends: Array<FriendForCard> = [
    {
      firstName: 'Mitch',
      lastName: 'Mitchell',
      lastSeen: new Date('3/10/2020')
    },
    {
      firstName: 'Aonia',
      lastName: 'Traxler',
      lastSeen: new Date('12/1/2020')
    },
    {
      firstName: 'Imogen',
      lastName: 'Hare',
      lastSeen: new Date('2/10/2022')
    },
    {
      firstName: 'Ben',
      lastName: 'Ho',
      lastSeen: new Date('11/4/2020')
    },
    {
      firstName: 'Moira',
      lastName: 'Fischer',
      lastSeen: new Date('1/12/2021')
    },
  ]

  const [query, setQuery] = useState<string>('')

  const [buttonOneSelected, setButtonOneSelected] = useState(true);
  const [buttonTwoSelected, setButtonTwoSelected] = useState(false);
  const [friends, setFriends] = useState<Array<FriendForCard>>(mockFriends);
  


  /*///////////////////
    HANDLERS
  *////////////////////
  const onChangeSearch = (query: string) => {
    setQuery(query);
    if (query === '') setFriends(mockFriends);
    const copy = [...mockFriends];
    const reg = new RegExp(`^${query}.*$`, 'i');
    const filtered = copy.filter((friend) => {
      if (reg.test(friend.firstName) || reg.test(friend.lastName)) return true;
      return false;
    });

    setFriends(filtered);
    
  };


  // TODO: Add more sorting options.
  const sortFriends = (direction: string) => {
    const copy = [...friends];

    if (direction === 'ascend') {
      copy.sort((a,b) => {
        return b.lastSeen.getTime() - a.lastSeen.getTime();
      });
    } else if (direction === 'descend') {

      copy.sort((a,b) => {
        return a.lastSeen.getTime() - b.lastSeen.getTime();
      });
    }
    setFriends(copy);
  };

  const handleButton = (button: string) => {
    if (button === 'last' && buttonOneSelected || button === 'longest' && buttonTwoSelected) {
      return;
    } else {
      setButtonOneSelected(!buttonOneSelected);
      setButtonTwoSelected(!buttonTwoSelected);
      button === 'last' ? sortFriends('ascend') : sortFriends('descend');
    }
  };
  
  /*///////////////////
    NAVIGATION
  *////////////////////

  const addFriend = () => {
    navigation.navigate('AddFriend');
  }



  return (
    <>
    <ScrollView style={styles.top}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={query}
        autoComplete={false}
        />
      <Text style={styles.label}>SORT BY:</Text>
      <View style={styles.sortButtons}>
        <Button mode="contained" style={styles.sortButton} color={buttonOneSelected ? '#1685EC': 'lightgrey'} onPress={() => handleButton('last')}>
           <Text>Last Seen</Text>
        </Button>
        <Button mode="contained" style={styles.sortButton} color={buttonTwoSelected ? '#1685EC' : 'lightgrey'} onPress={() => handleButton('longest')}>
            <Text>Longest Since</Text>
        </Button>
      </View>

      <View style={styles.friendBox}>
        {friends.map(friend => <FriendCard key={friend.firstName} friend={friend}/>)}
      </View>
      
    </ScrollView>
      <FAB
      style={styles.fab}
      icon="plus"
      onPress={addFriend}
    />
    </>
  )
}

const styles = StyleSheet.create({
  top: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 25, 
    color: 'darkgrey'
  },
  sortButtons: {
    margin: 10,
    justifyContent: 'space-between',
    height: 90
  },
  sortButton: {
    padding: 0,
  },
  friendBox: {
    marginTop: 40
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    opacity: 0.7
  },
})



export default Friends;