import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TicketScreen = () => {
  return (
    <View className="flex-1 bg-background-light">
      <Stack.Screen options={{
        headerShown: true,
        headerTitle: "Ticket Details",
        headerBackTitle: "Back",
        headerTintColor: '#fff', // This changes the back button color
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#e51827'
        }
      }} />
     <ScrollView>
      <Text>Ticket details</Text>
     </ScrollView>
    </View>
  )
}

export default TicketScreen