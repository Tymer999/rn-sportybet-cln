import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const FeaturedBetButton = () => {
  return (
    <TouchableOpacity className="flex-1 w-full h-5">
      <View className="w-full bg-secondary-light flex flex-row justify-between items-center px-2 py-1 rounded-sm overflow-hidden h-[2rem]">
        <Text className="text-secondary-dark font-bold">1</Text>
        <Text className="text-secondary-dark font-bold">1.76</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedBetButton;
