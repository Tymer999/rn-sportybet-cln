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
    icon: require("../../assets/game_icons/1bb13bffe71ad5abd3404668611eaef9.png"),
    name: "All Sports",
  },
  {
    id: 2,
    icon: require("../../assets/game_icons/live.png"),
    name: "Live",
  },
  {
    id: 3,
    icon: require("../../assets/game_icons/1bb13bffe71ad5abd3404668611eaef9.png"),
    name: "Sporty Hero",
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
            className={`flex items-center flex-col justify-start mx-2 w-14 mt-2`}
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
