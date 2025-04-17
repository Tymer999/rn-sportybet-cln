import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { images } from "@/constants/index";
import CustomHeaderButton from "../button/CustomHeaderButton";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Header = () => {
  return (
    <View className="bg-primary w-full h-[3rem] flex flex-row items-center justify-between px-4">
      <Image source={images.logo} className="w-1/4" resizeMode="contain" />

      <View className="flex flex-row items-center gap-[.5rem]">
      <FontAwesome name="search" size={20} color="white" />
        <CustomHeaderButton text="Join Now" textColor="text-red-600" backgroundColor="bg-white" />
        <CustomHeaderButton text="Log in" textColor="text-white" />
      </View>
    </View>
  );
};

export default Header;
