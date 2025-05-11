import { View, Text, Image } from "react-native";
import React, { FC, memo } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomBetButton from "../button/CustomBetButton";
const sportyTv = require("../../assets/images/stv.png");
const hot = require("../../assets/images/hot.png"); // Update the path to the correct location of hot.png

interface LiveMatchCardProps {
  match: {
    homeTeam: {
      name: string;
      score: number;
    };
    awayTeam: {
      name: string;
      score: number;
    };
    time: string;
    league: string;
    odds: {
      home: string;
      draw: string;
      away: string;
    };
    status: string;
    marketSize: string;
    stv: boolean;
    isHot: boolean;
  };
}



const LiveMatchCard: FC<LiveMatchCardProps> = ({ match }) => {
  return (
    <View className="">
      <View className="flex flex-row items-center justify-between mb-1 px-3">
        <View
          className={`flex flex-row items-center gap-2 ${
            match.isHot && "-translate-x-4"
          }`}
        >
          {match.isHot && (
            <View
              className="bg-primary flex flex-row items-center gap-1 pl-4 px-1 w-[5.25rem]"
              style={{
                position: "relative",
                overflow: "hidden",
                // Adjusted width to match the other buttons
              }}
            >
              <Text className="italic text-white font-bold z-10 text-nowrap text-sm">
                HOT
              </Text>
              <Image source={hot} className="w-4 h-4 z-10" />

              <View
                className={"bg-[#1B1E25]"}
                style={{
                  position: "absolute",
                  right: -25,
                  marginRight: 5,
                  top: 0,
                  bottom: 0,
                  width: 30,
                  transform: [{ skewX: "20deg" }],
                }}
              />
            </View>
          )}
          <View
            className={`flex-row gap-2 ${match.isHot && "-translate-x-4"}`}
          >
            <Text className="text-secondary-dark font-medium text-sm">
              {match.time} {match.status}
            </Text>
            <Text className="text-gray font-medium text-sm">
              {match.league}
            </Text>
          </View>
        </View>

        <Image
          source={require("../../assets/icons/match_tracker.png")}
          resizeMode="contain"
          className="w-4 h-4"
          tintColor={"#9CA0AB"}
        />
      </View>

      <View className="flex flex-row items-center justify-between w-full px-3">
        <View className="flex flex-row w-[40%] items-center justify-between">
          <View className="flex gap-[5px] flex-1">
            <Text
              className="text-white text-sm font-medium text-ellipsis"
              numberOfLines={1}
            >
              {match.homeTeam.name}
            </Text>
            <Text
              className="text-white text-sm font-medium text-ellipsis"
              numberOfLines={1}
            >
              {match.awayTeam.name}
            </Text>
          </View>
          <View className="flex gap-[5px] mr-1">
            <Text className="text-white text-sm font-medium" numberOfLines={1}>
              {match.homeTeam.score}
            </Text>
            <Text className="text-white text-sm font-medium" numberOfLines={1}>
              {match.awayTeam.score}
            </Text>
          </View>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-[1px]">
          <CustomBetButton
            backgroundColor="#22252e"
            textColor="#32CE62"
            text={match.odds.home}
          />
          <CustomBetButton
            backgroundColor="#22252e"
            textColor="#32CE62"
            text={match.odds.draw}
          />
          <CustomBetButton
            backgroundColor="#22252e"
            textColor="#32CE62"
            text={match.odds.away}
          />
        </View>
      </View>

      <View className="mt-2 px-4 flex-row items-center gap-2">
        <Text className="text-white">
          {match.marketSize}
          {">"}
        </Text>
        {match.stv && <Image source={sportyTv} className="w-5 h-5" />}
      </View>

      <View className="px-3">
        <View className="w-full h-[.5px] bg-gray my-3 opacity-20" />
      </View>
    </View>
  );
};

export default LiveMatchCard;
