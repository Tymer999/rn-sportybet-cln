import { View, Text, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DepositWithdrawButton from "../button/DepositWithdrawButton";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/constants/FormatCurrency";
import { router } from "expo-router";

const ProfileHeader = () => {
  const { user, userProfile } = useAuth();
  return (
    <View className="w-full bg-black px-4 pt-3">
      {user ? (
        <View>
          <View className="w-full flex flex-row items-center justify-between">
            <View className="flex flex-row gap-2 items-center">
              <Image
                source={require("../../assets/profile_pic_images/7.png")}
                resizeMode="contain"
                className="w-8 h-8 rounded-full"
              />

              <Text className="text-white font-medium text-lg">
                {userProfile?.username}
              </Text>

              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color={"#fff"}
              />
            </View>

            <MaterialIcons
              name="settings"
              size={20}
              color={"#fff"}
              onPress={() => router.push("/settingsScreen")}
            />
          </View>

          <View className="flex flex-row items-center justify-between mt-10">
            <View className="flex flex-row gap-2 items-center">
              <MaterialIcons name="remove-red-eye" size={20} color={"#fff"} />
              <Text className="text-white">Total Balance</Text>
            </View>

            <Text className="text-white font-bold">
              {userProfile?.currency}{" "}
              {formatCurrency(userProfile?.balance ?? 1.0)}
            </Text>
          </View>
        </View>
      ) : (
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-center gap-2">
            <MaterialIcons name="person-2" size={30} />
            <Text className="text-lg text-white">Login to View</Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color={"#fff"} />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-lg text-white">Dark Mode</Text>
            <MaterialIcons name="dark-mode" size={20} color={"#fff"} />
          </View>
        </View>
      )}

      <View className="flex flex-row items-center w-full gap-4 mt-4 mb-6">
        <DepositWithdrawButton icon="deposit" text="Deposit" />
        <DepositWithdrawButton icon="withdraw" text="Withdraw" />
      </View>
    </View>
  );
};

export default ProfileHeader;
