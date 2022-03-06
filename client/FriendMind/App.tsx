import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import { createContext, useEffect, useState } from 'react';
import { getFriends } from './api/FriendAPI';
import { Friend, FriendContextValue } from './types';


export const FriendContext = createContext({} as FriendContextValue);


export default function App() {
  const isLoadingComplete = useCachedResources();

  const [allFriends, setAllFriends] = useState<Array<Friend>>([]);

  /* 
    Handle context here.

  */

    useEffect(() => {
      getFriends(1).then(friends => { 
        setAllFriends(friends);
      }) 
    }, []);
  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <FriendContext.Provider value={{allFriends, setAllFriends}}>
      <PaperProvider>
        <SafeAreaProvider>
          <View style={{flex: 1}}>
            <Navigation/>
          </View> 
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
      </FriendContext.Provider>
    );
  }
}
