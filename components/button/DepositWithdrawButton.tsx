import { Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import React, { Component, FC } from 'react'

interface DepositWithdrawButtonProps {
  icon: string,
  text: string
}
const DepositWithdrawButton: FC<DepositWithdrawButtonProps> = ({icon, text}) =>  {
    return (
      <TouchableWithoutFeedback>
        <View className='flex-row items-center justify-center bg-secondary-dark flex-1 gap-4 h-[3.45rem] rounded-sm'>
          <Image source={require(`../../assets/icons/deposit.png`)} resizeMode='contain' className='w-5 h-5' />
 
          <Text className='text-white font-medium text-lg'>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
}

export default DepositWithdrawButton