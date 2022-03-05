import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <View style={{flex: 1}}>
            <Navigation/>
          </View> 
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
