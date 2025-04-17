import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";

interface GameTab {
  id: number;
  name: string;
}

const gameTabs: GameTab[] = [
  {
    id: 1,
    name: "TODAY'S FOOTBALL",
  },
  {
    id: 2,
    name: "FOOTBALL IN NEXT 3 HOURS",
  },
  {
    id: 3,
    name: "CHAMPIONS LEAGUE",
  },
  {
    id: 4,
    name: "CHAMPIONS LEAGUE",
  },
  // Add more game tabs as needed
];

const GameTab = () => {
  const [, setActiveTab] = React.useState(1);

  return (
    <View className="w-full h-[4.55rem] mt-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-none py-1 bg-transparent w-full px-3 pr-10 -z-40" // Removed w-full and adjusted padding
      >
        {gameTabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`flex items-center flex-col justify-start mx-[.2rem] w-[8rem] h-[4rem] ${index === gameTabs.length -1 ? "mr-3" : ""}`}
          >
            <View
              className="w-full bg-white rounded-sm overflow-hidden h-[3.55rem]"
              style={{ boxShadow: "4px 4px 3px 1px rgba(0, 0, 0, 0.1), -1px 4px 3px 1px rgba(0, 0, 0, 0.1)" }}
            >
              <View className={`w-full h-1 bg-red-700`} />
              <View className="px-2">
                <Text className="text-black font-medium">{tab.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default GameTab;
