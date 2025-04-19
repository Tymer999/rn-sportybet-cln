import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Switch,
} from "react-native";
import React, { useState } from "react";
import PlacedBetCard from "../cards/PlacedBetCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HistoryBetCard from "../cards/HistoryBetCard";

const betHistoryTabsList = [
  { name: "Settled", id: 1 },
  { name: "Unsettled", id: 2 },
  { name: "All", id: 3 },
];

const BetHistoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const betHistoryTabElements = betHistoryTabsList.map((tab, index) => (
    <TouchableWithoutFeedback
      key={tab.id}
      onPress={() => setSelectedTab(index + 1)}
    >
      <View
        className={`px-2 py-2 ${
          selectedTab === tab.id ? "bg-black" : "bg-gray-light"
        } rounded-sm flex-1 items-center justify-center`}
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
      <View className="flex flex-row items-center justify-between px-4 py-2 gap-2">
        <View className="flex-1 flex-row gap-2 ">{betHistoryTabElements}</View>

        <View className="flex flex-row gap- items-center">
          <Image
            source={require("../../assets/icons/f1bf2083a8161d46dd3ad42b3bbba5f1.png")}
            resizeMode="contain"
            className="w-6 h-6"
            tintColor={"#353A45"}
          />

          <Switch style={{ transform: [{ scale: 0.7 }] }} />

          <MaterialIcons name="more-horiz" size={25} color={"#353A45"} />
        </View>
      </View>
      <ScrollView className="w-full">
        <HistoryBetCard />
        <HistoryBetCard />
        <View className="w-full h-[28rem]" />
      </ScrollView>
    </View>
  );
};

export default BetHistoryScreen;
