import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProfileHeader from '@/components/sections/ProfileHeader'
import ProfileContent from '@/components/sections/ProfileContent'
import ProfileFooter from '@/components/sections/ProfileFooter'

const ProfileScreen = () => {
  return (
    <View className='bg-black'>
      <View className="w-full h-14 bg-black" />

      <ScrollView className='bg-black' >
        <ProfileHeader />

        <ProfileContent />

        <ProfileFooter />

      </ScrollView>
    </View>
  )
}

export default ProfileScreen