import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const HistoryBetCard = () => {

  const router = useRouter();

  const handlePress = () => {
    router.push("/ticketScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className="flex-row mb-4 pl-2">
        <View className="w-[3rem]">
          <Text className="text-xl font-bold text-gray">17</Text>
          <Text className="text-sm text-gray">Apr</Text>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between bg-gray-600 py-1 px-1 mr-4">
            <Text className="text-white font-bold text-lg">Multiple</Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-white font-bold text-lg">Lost</Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={15}
                color={"#fff"}
              />
            </View>
          </View>

          <View className="flex mr-8 gap-2 mt-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray">Total Stake(GHS)</Text>
              <Text className="text-black">0.10</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray">Total Return</Text>
              <Text className="text-gray text-xl font-bold">0.00</Text>
            </View>
          </View>
          <View
            className="bg-gray mt-3 mb-3"
            style={{ width: "100%", height: 0.5 }}
          />

          <View className="flex mr-4 gap-1 mb-3">
            <Text className="text-gray">Inter v Bayern Munich</Text>
            <Text className="text-gray">Real Madrid v Arsenal</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HistoryBetCard;
