import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomBetButton from "../button/CustomBetButton";
const hot = require("../../assets/images/hot.png"); // Update the path to the correct location of hot.png
const sportyTv = require("../../assets/images/stv.png");

interface FeaturedMatch {
  isBestOdds: boolean;
  isHot: boolean;
  id: string;
  league: string;
  homeName: string;
  awayName: string;
  homeScore: string;
  awayScore: string;
  time: string;
  date: string;
  status: "live" | "upcoming" | "finished";
  marketSize: string;
  stv: boolean;
  outcome: Array<{
    desc: string;
    odds: string;
    pick: string;
  }>;
  odds: {
    home: number;
    draw: number;
    away: number;
  };

  score: string;
  eventTime: string;
  matchStatus: string;
}

interface UpcomingMatchCardProps {
  match: FeaturedMatch;
}

const UpcomingMatchCard: FC<UpcomingMatchCardProps> = ({ match }) => {
  return (
    <View className="flex-1">
      <View className={`flex flex-row items-center justify-between mb-1 flex-1 pr-3`}>
        <View className="flex flex-row items-center gap-2 flex-1">
        <View className="flex flex-row items-center">
          {match.isHot && (
            <View
              className="bg-primary flex flex-row items-center gap-1 px-1 w-[4.5rem]"
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
                className={!match.isBestOdds ? "bg-white" : "bg-secondary-dark"}
                style={{
                  position: "absolute",
                  right: -30,
                  marginRight: 10,
                  top: 0,
                  bottom: 0,
                  width: 30,
                  transform: [{ skewX: "30deg" }],
                }}
              />
            </View>
          )}
          {match.isBestOdds && (
            <View
              className="bg-secondary-dark flex flex-row items-center gap-1 px-1 w-[6.5rem]"
              style={{
                position: "relative",
                overflow: "hidden",
                // Adjusted width to match the other buttons
              }}
            >
              <Text
                className="italic text-white font-bold z-10 text-nowrap text-sm"
                numberOfLines={1}
              >
                Best Odds
              </Text>
              <Image source={hot} className="w-4 h-4 z-10" />
              <View
                style={{
                  position: "absolute",
                  right: -20,
                  top: 0,
                  bottom: 0,
                  width: 25,
                  backgroundColor: "white", // green-600
                  transform: [{ skewX: "30deg" }],
                }}
              />
            </View>
          )}
        </View>
        <View className={`flex-row items-center gap-2 ${(match.isBestOdds || match.isHot) && "-translate-x-3"} flex-1`}>

          <Text className="text-black font-medium text-sm pl-1">{match.time}</Text>
          <Text className="text-gray font-medium text-sm flex-1" numberOfLines={1}>
            {match.league.split("Football -")[1].trim()}
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
          <View className="flex gap-[5px]">
            <Text className="text-black text-sm font-medium">
              {match.homeName}
            </Text>
            <Text className="text-black text-sm font-medium">
              {match.awayName}
            </Text>
          </View>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-[1px]">
          <CustomBetButton
            backgroundColor="#daeadd"
            textColor="#0D9737"
            text={match.outcome[0].odds}
          />
          <CustomBetButton
            backgroundColor="#daeadd"
            textColor="#0D9737"
            text={match.outcome[1].odds}
          />
          <CustomBetButton
            backgroundColor="#daeadd"
            textColor="#0D9737"
            text={match.outcome[2].odds}
          />
        </View>
      </View>

      <View className="mt-2 px-4">
        <Text className="text-black">+34 {">"}</Text>
      </View>

      <View className="px-3">
        <View className="w-full h-[.5px] bg-gray my-3" />
      </View>
    </View>
  );
};

export default UpcomingMatchCard;
