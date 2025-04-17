import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CustomBetButton from '../button/CustomBetButton'

const LiveMatchCard = () => {
  return (
    <View className=''>
     <View className='flex flex-row items-center justify-between mb-1 px-3'>
      <View className='flex flex-row items-center gap-2'>
        <Text className='text-secondary-dark font-medium text-sm'>65:16 H2</Text>
        <Text className='text-gray font-medium text-sm'>Italy - Serie A</Text>
      </View>

      <FontAwesome name="caret-square-o-right" size={20} color="gray" />
     </View>

     
     <View className='flex flex-row items-center justify-between w-full px-3'>
      <View className='flex flex-row w-[40%] items-center justify-between'>
        <View className='flex gap-[5px]'>
          <Text className='text-white text-sm font-medium'>Ghana</Text>
          <Text className='text-white text-sm font-medium'>Nigeria</Text>
        </View>
        <View className='flex gap-[5px] mr-1'>
          <Text className='text-white text-sm font-medium'>0</Text>
          <Text className='text-white text-sm font-medium'>0</Text>
        </View>
      </View>
      <View className='flex-1 flex-row items-center justify-between gap-[1px]'>
        <CustomBetButton backgroundColor='#34383c' textColor='#32CE62' />
        <CustomBetButton backgroundColor='#34383c' textColor='#32CE62' />
        <CustomBetButton backgroundColor='#34383c' textColor='#32CE62' />
      </View>
     </View>

     <View className='mt-2 px-4'>
      <Text className='text-white'>+34 {">"}</Text>
     </View>

     <View className='px-3'>
     <View className='w-full h-[.5px] bg-gray my-3 opacity-20' />
     </View>
    </View>
  )
}

export default LiveMatchCard