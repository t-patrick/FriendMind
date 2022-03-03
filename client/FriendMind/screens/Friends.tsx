import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text } from 'react-native'
import MenuIcon from '../components/MenuIcon';

function Friends() {

  const navigation = useNavigation();
  
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuIcon/>,
      backButton: {
        visible: false
      }
    })
  }, []);

  return (
    <Text>Friends</Text>
  )
}

export default Friends