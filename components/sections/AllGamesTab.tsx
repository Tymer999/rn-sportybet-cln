import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";

interface GameTab {
  id: number;
  icon: any;
  name: string;
}

const gameTabs: GameTab[] = [
  {
    id: 1,
    icon: require("../../assets/game_icons/all_sports.png"),
    name: "All Sports",
  },
  {
    id: 2,
    icon: require("../../assets/game_icons/live.png"),
    name: "Live",
  },
  {
    id: 3,
    icon: require("../../assets/game_icons/sporty_hero.png"),
    name: "Sporty Hero",
  },
  {
    id: 4,
    icon: require("../../assets/game_icons/d0839820d9f53131fa12f9583c909440.png"),
    name: "Aviator",
  },
  {
    id: 5,
    icon: require("../../assets/game_icons/virtuals.png"),
    name: "Virtuals",
  },
  {
    id: 6,
    icon: require("../../assets/game_icons/promotions.png"),
    name: "Promotions",
  },
  {
    id: 7,
    icon: require("../../assets/game_icons/code_hub.png"),
    name: "Code Hub",
  },
  {
    id: 8,
    icon: require("../../assets/game_icons/games.png"),
    name: "Games",
  },
  {
    id: 9,
    icon: require("../../assets/game_icons/instant_virtuals.png"),
    name: "Instant Virtuals",
  },
  {
    id: 10,
    icon: require("../../assets/game_icons/jackpot.png"),
    name: "Jackpot",
  },
  {
    id: 11,
    icon: require("../../assets/game_icons/load_code.png"),
    name: "Load Code",
  },
  {
    id: 12,
    icon: require("../../assets/game_icons/verify.png"),
    name: "Verify Bet",
  },
  {
    id: 13,
    icon: require("../../assets/game_icons/multi_marker.png"),
    name: "Multi Marker",
  },
  // Add more game tabs as needed
];

const AllGamesTab = () => {
  const [, setActiveTab] = React.useState(1);

  return (
    <View className="w-full h-16 bg-transparent mt-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-none py-1 bg-transparent" // Removed w-full and adjusted padding
      >
        {gameTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`flex items-center flex-col justify-start mx-1 w-[3.75rem] mt-2`}
          >
            <Image
              source={tab.icon}
              className="w-6 h-6" // Reduced bottom margin
              resizeMode="contain"
            />

            <Text className="text-xs text-black font-normal text-center">
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllGamesTab;
