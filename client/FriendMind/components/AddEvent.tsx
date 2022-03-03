import React, { PropsWithRef } from 'react'
import { Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { AddEventProps } from '../types'

function AddEvent({navigation, route}: AddEventProps) {

  return (
    <View>
       <Appbar>
        <Appbar.Action
          icon="arrow-left" onPress={navigation.goBack}/>
      </Appbar>
      <Text>{route.params!.location}</Text>
    </View>
  )
}

export default AddEvent