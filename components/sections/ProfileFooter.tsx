import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import License from "../../assets/svg_images/license.svg";
import Icon18 from "../../assets/svg_images/icon18.svg";

const ProfileFooter = () => {
  return (
    <View>
      <View className="flex-row flex-wrap justify-between items-center bg-gray-light px-4 py-3 h-[3rem]">
        <View className="flex-row gap-2 items-center h-full">
          <License fill="#fff" style={{ transform: [{ scale: 0.5 }] }} />
          <Icon18 width={25} height={30} fill="#fff" />
        </View>

        <Text className="text-white text-sm">
          © 2025 Sportybet. All rights reserved.
        </Text>
      </View>

      <View className="bg-black w-full px-4">
        <View className="w-full justify-center h-[7rem]">
          <Image
            source={require("../../assets/images/partnerships.png")}
            resizeMode="contain"
            className="w-[70%] mx-auto"
          />
        </View>

        <View className="flex items-center justify-center gap-1 mb-3">
          <Text className=" text-white text-xs">M-PESA Paybill:</Text>
          <Text className=" text-white text-[16px] font-bold">*711*222#</Text>
          <Text className="text-center text-white font-medium text-xs">Payment methods</Text>
        </View>

        <View className="gap-1 mb-4">
          <View className="flex flex-row flex-wrap w-[65%] gap-1 mx-auto">
            <View className="flex-1 items-center justify-center h-[1.5rem] bg-secondary rounded-sm">
              <Image
                source={require("../../assets/payment_methods/footer_at_logo.png")}
                resizeMode="contain"
                className="w-[100%] h-[100%]"
              />
            </View>
            <View className="flex-1 items-center justify-center h-[1.5rem] bg-secondary rounded-sm">
              <Image
                source={require("../../assets/payment_methods/footer_mtn_logo.png")}
                resizeMode="contain"
                className="w-[100%] h-[100%]"
              />
            </View>
            <View className="flex-1 items-center justify-center h-[1.5rem] bg-secondary rounded-sm">
              <Image
                source={require("../../assets/payment_methods/footer_telecel_logo.png")}
                resizeMode="contain"
                className="w-[100%] h-[100%]"
              />
            </View>
          </View>
          <View className="flex flex-row flex-wrap w-[65%] gap-1 mx-auto">
            <View className="flex-1 items-center justify-center h-[1.5rem] bg-secondary rounded-sm">
              <Image
                source={require("../../assets/payment_methods/footer_visa_logo.png")}
                resizeMode="contain"
                className="w-[100%] h-[100%]"
              />
            </View>
            <View className="flex-1 items-center justify-center h-[1.5rem] bg-secondary rounded-sm">
              <Image
                source={require("../../assets/payment_methods/footer_mastercard_logo.png")}
                resizeMode="contain"
                className="w-[100%] h-[100%]"
              />
            </View>
            <View className="flex-1 items-center justify-center h-[1.5rem] bg-secondary rounded-sm">
              <Image
                source={require("../../assets/payment_methods/footer_gtbank_logo.png")}
                resizeMode="contain"
                className="w-[100%] h-[100%]"
              />
            </View>
          </View>
        </View>

        <Text className="text-center w-[90%] mx-auto text-white text-xs font-medium mt-2 mb-4">
          Age 18 and above only. Play Responsibly. Betting is addictive and can
          be psychologically harmful. SportyBet Ghana is licensed by the Gaming
          Commission of Ghana.
        </Text>

        <View className="w-full h-[.3px] bg-gray my-4" />

        <View className="flex-row gap-1 items-end justify-center mb-4">
          <Text className="text-gray font-medium underline text-sm">Terms & Conditions</Text>
          <View className="w-[1px] h-[.7rem] bg-gray" />
          <Text className="text-gray font-medium underline text-sm">About Us</Text>
        </View>


        <View className="flex items-center justify-center w-full h-[3rem] bg-primary">
          <Text className="text-white text-xl font-medium">Log Out</Text>
        </View>

        <View className="w-full h-[12rem]" />
      </View>
    </View>
  );
};

export default ProfileFooter;
