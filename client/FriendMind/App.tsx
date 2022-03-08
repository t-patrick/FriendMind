import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox, Text, View } from 'react-native';
import { createContext, useEffect, useState } from 'react';
import { getFriends } from './api/FriendAPI';
import { Friend, FriendContextValue } from './types';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';



console.disableYellowBox = true;
const ignore = true
LogBox.ignoreAllLogs(ignore);

export const FriendContext = createContext({} as FriendContextValue);


export default function App() {
  const isLoadingComplete = useCachedResources();

  const [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const fontSize = 24;
  const paddingVertical = 6;


  const [allFriends, setAllFriends] = useState<Array<Friend>>([]);

  /* 
    Handle context here.

  */

    useEffect(() => {
      getFriends(1).then(friends => { 
        setAllFriends(friends);
      }) 
    }, []);
  

  if (!fontsLoaded || !isLoadingComplete) {
    return <AppLoading />;
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
