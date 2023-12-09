import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../../App/Shared/Colors'

export default function HorizontalLine() {
  return (
    <View style={{
        borderBottomWidth: 1,
        borderColor: Colors.grey, margin: 5, 
        marginBottom: 15,
        marginTop:15
    }}></View>
  )
}