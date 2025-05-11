import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface FeaturedBetButtonProps {
  desc: string;
  odds: string;
}
const FeaturedBetButton: FC<FeaturedBetButtonProps> = ({desc, odds}) => {
  return (
    <TouchableOpacity className="flex-1 w-full h-5">
      <View className="w-full bg-secondary-light flex flex-row justify-between items-center px-2 py-1 rounded-sm overflow-hidden h-[2.25rem]">
        <Text className="text-[#0b752b] font-bold">{desc}</Text>
        <Text className="text-[#0b752b] font-bold">{odds}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedBetButton;
