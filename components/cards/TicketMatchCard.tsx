import { View, Text, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TicketMatchCard = () => {
  return (
    <View className="flex-row items-center mx-3 pt-3 pb-7 border-b-[.3px] border-b-gray">
      <View className="w-[4rem]">
        <MaterialIcons name="check-circle" size={22} color={"#0D9737"} />
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-1">
          <Text className="text-sm text-gray">Game ID: 22935</Text>
          <View className="w-[1px] h-[.7rem] bg-gray" />
          <Text className="text-sm text-gray">17/04, 16:00</Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Text className="font-normal text-black text-[15px]">FC Midtjylland</Text>
          <Text className="font-normal text-gray text-[15px]">v</Text>
          <Text className="font-normal text-black text-[15px]">Copenhagen</Text>
        </View>

        <View className="flex-row items-center gap-2 mx-[1px]">
          <Image source={require("../../assets/icons/match_tracker.png")} resizeMode="contain" className="w-4 h-4" />

          <Text className="text-secondary-dark text-sm">Match Tracker</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Text className="text-gray font-normal text-[15px]">FT Score</Text>
          <Text className="text-lg">4:2</Text>
        </View>

        <View className="flex-row items-center gap-2 p-2 bg-secondary-light mt-2">
          <View className="items-end gap-[1.75px]">
            <Text className="text-gray text-[15px] font-normal">Pick</Text>
            <Text className="text-gray text-[15px] font-normal">Market</Text>
            <Text className="text-gray text-[15px] font-normal">Outcome</Text>
          </View>
          <View className="gap-[1.75px]">
            <Text className="text-black text-[15px]">Home@1.38</Text>
            <Text className="text-black text-[15px]">1X2</Text>
            <Text className="text-black text-[15px]">Draw</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TicketMatchCard;
