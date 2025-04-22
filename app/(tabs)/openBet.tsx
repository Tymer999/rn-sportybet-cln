import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import BetHistoryScreen from "@/components/screens/BetHistoryScreen";
import OpenBetSection from "@/components/screens/OpenBetScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const tabList = [
  { name: "Open Bets", id: 1 },
  { name: "Bet History", id: 2 },
];

const OpenBetScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const [selectedTab, setSelectedTab] = useState<number>(1);

  const tabElements = tabList.map((tab, index) => (
    <TouchableWithoutFeedback
      className="flex flex-1"
      key={tab.id}
      onPress={() => setSelectedTab(index + 1)}
    >
      <View
        className={`flex items-center justify-center w-[50%]  p-4 h-[3.55rem] ${
          selectedTab === tab.id ? "bg-background-light" : "bg-[#4d515c]"
        } rounded-t-sm`}
      >
        <Text
          className={`${
            selectedTab === tab.id ? "text-black" : "text-white"
          } font-medium`}
        >
          {tab.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  return (
    <View>
      <View className="w-full h-14 bg-black" />

      <View className="bg-black">
        {isLoggedIn ? (
          <View className="flex flex-row w-full items-center justify-end gap-2 px-8 py-4">
            <View className="w-5 h-5 rounded-full overflow-hidden border-[1px] border-white">
              <Image
                source={require("../../assets/profile_pic_images/7.png")}
                resizeMode="contain"
                className="w-5 h-5 rounded-full"
              />
            </View>
            <Text className="font-semibold text-yellow-500 text-[1.05rem]">GHS 1.71</Text>
          </View>
        ) : (
          <View className="flex flex-row w-full items-center justify-end gap-2 px-4 py-4">
            <Text className="text-gray text-lg font-normal">Register</Text>
            <View className="bg-gray" style={{ width: 1, height: 16 }} />
            <Text className="text-gray text-lg font-normal">Login</Text>
          </View>
        )}

        <View className="flex flex-row w-[80%] mx-auto items-end justify-center gap-[5px]">
          {tabElements}
        </View>
      </View>

      {!isLoggedIn ? <View className="items-center justify-center w-full h-[60%]">
        <MaterialIcons name="feedback" size={50} color={"#9CA0AB"} />
        <Text className="text-lg text-gray max-w-[70%] text-center">Please Log In to see your Open Bets and Cashout Bets</Text>
        <Text className="text-lg text-secondary-dark max-w-[80%] my-8">
          What is Cashout?
        </Text>

        <View className="border px-2 py-2 rounded-sm border-secondary-dark">
          <Text className="text-secondary-dark">Login</Text>
        </View>
      </View> : selectedTab === 1 ? <OpenBetSection /> : <BetHistoryScreen />}
    </View>
  );
};

export default OpenBetScreen;
