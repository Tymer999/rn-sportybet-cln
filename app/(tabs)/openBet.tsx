import { View, Text, TouchableWithoutFeedback, ScrollView } from "react-native";
import React, { useState } from "react";
import BetHistoryScreen from "@/components/screens/BetHistoryScreen";
import  OpenBetSection from "@/components/screens/OpenBetScreen";

const tabList = [
  { name: "Open Bets", id: 1 },
  { name: "Bet History", id: 2 },
];

const OpenBetScreen = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1)

  const tabElements = tabList.map((tab, index) => (
    <TouchableWithoutFeedback className="flex flex-1" key={tab.id} onPress={() => setSelectedTab(index + 1)}>
      <View className={`flex items-center justify-center w-[50%]  p-4 h-[3.55rem] ${selectedTab === tab.id ? "bg-background-light" : "bg-[#4d515c]"} rounded-t-sm`}>
        <Text className={`${selectedTab === tab.id ? "text-black" : "text-white"} font-medium`}>{tab.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  ));
  
  return (
    <View>
      <View className="w-full h-14 bg-black" />
      <View className="bg-black">
        <View className="flex flex-row w-full items-center justify-end gap-2 px-4 py-4">
          <Text className="text-gray text-lg font-medium">Register</Text>
          <View className="bg-gray" style={{ width: 1, height: 16 }} />
          <Text className="text-gray text-lg font-medium">Login</Text>
        </View>

        <View className="flex flex-row w-[80%] mx-auto items-end justify-center gap-[5px]">
          {tabElements}
        </View>
      </View>

      {
        selectedTab === 1 ? <OpenBetSection /> : <BetHistoryScreen />
      }
    </View>
  );
};

export default OpenBetScreen;
