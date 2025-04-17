import { View, Text, Image } from 'react-native'
import React from 'react'

const GamesScreen = () => {
  return (
    <View
        className="flex-1 w-full h-full bg-background-light"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <View className="w-full h-14 bg-primary" />
    
          <View className='w-full h-full items-start justify-start'>
                  <Image source={require("../../assets/images/games.jpg")} className='w-full h-full' resizeMode='repeat' />
                </View>
        </View>
  )
}

export default GamesScreen