import { View, Text, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DepositWithdrawButton from "../button/DepositWithdrawButton";

const ProfileHeader = () => {

  return (
    <View className="w-full bg-black px-4 pt-3">
      <View className="w-full flex flex-row items-center justify-between">
        <View className="flex flex-row gap-2 items-center">
          <Image
            source={require("../../assets/profile_pic_images/7.png")}
            resizeMode="contain"
            className="w-8 h-8 rounded-full"
          />

          <Text className="text-white font-medium text-lg">ALICE BOAHEMAA OSEI</Text>

          <MaterialIcons name="arrow-forward-ios" size={20} color={"#fff"} />
        </View>

        <MaterialIcons name="settings" size={20} color={"#fff"} />
      </View>

      <View className="flex flex-row items-center justify-between mt-10">
        <View className="flex flex-row gap-2 items-center">
          <MaterialIcons name="remove-red-eye" size={20} color={"#fff"} />
          <Text className="text-white">Total Balance</Text>
        </View>

        <Text className="text-white font-bold">GHS 1.71</Text>
      </View>

      <View className="flex flex-row items-center w-full gap-4 mt-4 mb-6">
        <DepositWithdrawButton icon="deposit" text="Deposit" />
        <DepositWithdrawButton icon="withdraw" text="Withdraw" />
      </View>
    </View>
  );
};

export default ProfileHeader;
