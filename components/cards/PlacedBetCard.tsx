import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Material from "@expo/vector-icons/MaterialIcons";

const PlacedBetCard = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const matches = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]

  const MatchesElements = matches.map((match, index) => (<View className={`flex-row items-center ${index === matches.length - 1 ? "" : "border-b-[.6px] border-b-gray"} gap-2 pt-3 pb-8`} key={match.id}>
    <View className="w-10rem]" style={{width: 40}}>
      <Material name="schedule" size={20} color={"#353A45"} />
    </View>
    <View className="gap-2 flex-1">
      <View className="flex flex-row items-center gap-1">
        <Image source={require("../../assets/icons/football.png")} className="w-4 h-4" resizeMode="contain" />
        <Text className="font-bold text-black">Home</Text>
        <Text className="font-bold text-black">@2.45</Text>
        <Text className="text-gray">1X2</Text>
      </View>
      <View className="flex flex-row gap-0">
        <Text className="text-black font-medium underline">FC Midtjlland </Text>
        <Text className="text-gray underline">vs</Text>
        <Text className="text-black font-medium underline"> Copenhagen</Text>
      </View>
      <View className="flex flex-row">
        <Text className="text-gray text-sm">17/04 16:45</Text>
      </View>
    </View>
  </View>));

  return (
    <View
      className="bg-white mx-4 mt-3 px-6 pb-3 pt-2 rounded-sm"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold text-black">Multiple</Text>
        </View>

        <View className="flex flex-row gap-2 items-center">
          <Ionicons name="share-social" size={18} color={"#0D9737"} />
          <View className="bg-gray" style={{ width: 1, height: 20 }} />
          <Text className="text-secondary-dark ">Edit Bet</Text>
        </View>
      </View>

      <View
        className="bg-gray mt-2"
        style={{ width: "100%", height: .5 }}
      />

      {!expanded ? (
        <TouchableWithoutFeedback onPress={() => setExpanded(true)}>
          <View className="flex flex-row items-start justify-between w-full pt-2">
            <View className="flex-1 pr-2 gap-2">
              <View className="flex flex-row gap-2">
                <Text className="text-black font-medium">Real Madrid</Text>
                <Text className="text-gray font-medium">vs</Text>
                <Text className="text-black font-medium">Arsenal</Text>
              </View>

              <View className="flex flex-row gap-1">
                <Text className="text-gray font-medium">Stake</Text>
                <Text className="text-black font-bold">1.10</Text>
              </View>
            </View>
            <View
              style={{ width: 130, borderRadius: 3 }}
              className="flex items-center justify-center p-2 bg-secondary-dark"
            >
              <Text className="text-white font-medium">Cashout</Text>
              <Text className="text-white font-bold">GHS 0.16</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View>
          <View>
            {MatchesElements}
          </View>

          <TouchableWithoutFeedback
            className="w-full"
            onPress={() => setExpanded(false)}
          >
            <View className="flex flex-row gap-2 items-center justify-end">
              <Text className="text-gray text-sm">Hide Match Details</Text>
              <FontAwesome name="caret-up" size={15} color={"#0D9737"} />
            </View>
          </TouchableWithoutFeedback>
          <View
            className="bg-gray mt-2 mb-2"
            style={{ width: "100%", height: .5 }}
          />

          <View className="gap-2">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-black font-normal">Stake</Text>
              <Text className="text-black font-bold">0.10</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-black font-normal">Pot. Win</Text>
              <Text className="text-black font-bold">0.10</Text>
            </View>
          </View>

          <View className="mt-2">
            <View className="w-full h-[3.25rem] bg-secondary-dark flex-row items-center gap-1 justify-center">
              <Text className="text-white font-medium">Cashout</Text>
              <Text className="text-white font-bold">GHS 1.20</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PlacedBetCard;
