import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, FAB, Headline, Searchbar } from 'react-native-paper';
import { FriendContext } from '../App';
import FriendCard from '../components/FriendCard';
import { Friend, FriendContextValue, FriendForCard, FriendsProps } from '../types';


function Friends({navigation, route}: FriendsProps) {


  const context: FriendContextValue = useContext(FriendContext);

  const { allFriends } = context;



  /*///////////////////
    STATE
  *////////////////////


  const [query, setQuery] = useState<string>('')

  const [buttonOneSelected, setButtonOneSelected] = useState(true);
  const [buttonTwoSelected, setButtonTwoSelected] = useState(false);
  const [currentFriends, setCurrentFriends] = useState<Array<FriendForCard>>([]);
  
  const convertFriends = (allFriends: Array<Friend>) => {
    return allFriends.map(friend => {
      return {
        id: friend.id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        lastSeen: friend.lastComms[0].lastCommunication.date,
        picture: friend.profilePictureUrl
      }
    });
  };

  useEffect(() => {
    const cards = convertFriends(allFriends);

    setCurrentFriends(cards);
  }, [allFriends])


  /*///////////////////
    HANDLERS
  *////////////////////
  const onChangeSearch = (query: string) => {
    setQuery(query);
    if (query === '') setCurrentFriends(convertFriends(allFriends));
    const copy = [...allFriends];
    const reg = new RegExp(`^${query}.*$`, 'i');
    const filtered = copy.filter((friend) => {
      if (reg.test(friend.firstName) || reg.test(friend.lastName)) return true;
      return false;
    });

    setCurrentFriends(convertFriends(filtered));
    
  };


  // TODO: Add more sorting options.
  const sortFriends = (direction: string) => {
    const copy = [...currentFriends];

    if (direction === 'ascend') {
      copy.sort((a,b) => {
        return b.lastSeen.getTime() - a.lastSeen.getTime();
      });
    } else if (direction === 'descend') {

      copy.sort((a,b) => {
        return a.lastSeen.getTime() - b.lastSeen.getTime();
      });
    }
    setCurrentFriends(copy);
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

  const goToFriend = (id: number) => {
    const friendData = allFriends.find(item => item.id === id) as Friend;
    navigation.navigate('Friend', {friend: friendData});
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
        {currentFriends.map(friend => <FriendCard key={friend.id} friend={friend} goToFriend={goToFriend}/>)}
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
    color: 'darkgrey',
    fontFamily: 'Manrope_400Regular'
  },
  sortButtons: {
    margin: 10,
    justifyContent: 'space-between',
    height: 90,
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