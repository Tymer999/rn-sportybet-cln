import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import PlacedBetCard from "../cards/PlacedBetCard";
import Ionicons from "@expo/vector-icons/Ionicons";

const openBetTabsList = [
  { name: "All", id: 1 },
  { name: "Cashout Available", id: 2 },
  { name: "Live Games", id: 3 },
];

const OpenBetScreen = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const openBetTabElements = openBetTabsList.map((tab, index) => (
    <TouchableWithoutFeedback
      key={tab.id}
      onPress={() => setSelectedTab(index + 1)}
    >
      <View
        className={`px-2 py-2 ${
          selectedTab === tab.id ? "bg-black" : "bg-white"
        } rounded-sm`}
      >
        <Text
          className={`${selectedTab === tab.id ? "text-white" : "text-black"}`}
        >
          {tab.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  return (
    <View className="w-full h-full bg-background-light">
      <View className="flex flex-row items-center justify-between px-4 py-2">
        <View className="flex flex-row gap-2 ">
          {openBetTabElements}
        </View>

        <Ionicons name="grid-sharp" size={20} color={"#9CA0AB"} />
      </View>
      <ScrollView className="w-full">
        <PlacedBetCard />
        <PlacedBetCard />
        <View className="w-full h-[28rem]" />
      </ScrollView>
    </View>
  );
};

export default OpenBetScreen;
