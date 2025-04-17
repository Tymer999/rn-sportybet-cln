import { View, Text, ScrollView, Animated, Image } from "react-native";
import React, { useRef } from "react";
import FeaturedBetButton from "../button/FeaturedBetButton";
import LiveMatchCard from "../cards/LiveMatchCard";

import StickyHeaderFlatlist from 'react-native-sticky-header-flatlist';


interface Team {
  name: string;
  score: number;
  logo: any;
}

interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  league: string;
}

interface LiveMatchCardProps {
  match: Match;
}

const gamesList = [
  {
    id: 1,
    name: "Football",
  },
  {
    id: 1,
    name: "Basketball",
  },
  {
    id: 1,
    name: "Tennis",
  },
  {
    id: 1,
    name: "Table Tennis",
  },
  {
    id: 1,
    name: "Football",
  },
  {
    id: 1,
    name: "Football",
  },
  {
    id: 1,
    name: "Football",
  },
  {
    id: 1,
    name: "Football",
  },
];

const betTypesList = [
  {
    id: 1,
    name: "1X2",
  },
  {
    id: 1,
    name: "O/U",
  },
  {
    id: 1,
    name: "DC",
  },
  {
    id: 1,
    name: "1st Half O/U",
  },
  {
    id: 1,
    name: "Handicap",
  },
  {
    id: 1,
    name: "Home O/U",
  },
  {
    id: 1,
    name: "Away O/U",
  },
  {
    id: 1,
    name: "GG/NG",
  },
];

const Header = () => {
  const gamesElements = gamesList.map((game, index) => (
    <Text
      key={index}
      className={`mr-6 ${
        index === 0 ? "text-secondary-dark font-bold" : "text-white font-medium"
      }`}
    >
      {game.name}
    </Text>
  ));

  const betTypesElements = betTypesList.map((game, index) => (
    <View className="flex items-start justify-start flex-1" key={index}>
      <Text className={`text-white px-3 mb-4 text-sm font-bold`}>
        {game.name}
      </Text>

      {index === 0 && <View className="w-full h-1 bg-secondary" />}
    </View>
  ));

  return <View className="sticky top-0 z-30 bg-[#1B1E25] mt">
  <View className="flex flex-row items-center gap-4 px-4 py-3">
    <Text className="text-white font-bold text-xl">LIVE</Text>
    <View className="bg-gray-light" style={{ width: 1, height: 16 }} />
    <View className="w-full">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-none py-1 bg-transparent pr-10"
      >
        {gamesElements}
      </ScrollView>
    </View>
  </View>

  <View className="w-full mt-4 mb-0">
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-none py-1 bg-transparent pr-10"
    >
      {betTypesElements}
    </ScrollView>
  </View>

  <View className="w-full bg-[#363a44] h-[2.25rem] mt-0 justify-center items-end -translate-y-1 px-3">
    <View className="w-[60%] flex flex-row items-center justify-around">
      <Text className="text-gray font-medium text-sm">1</Text>
      <Text className="text-gray font-medium text-sm">X</Text>
      <Text className="text-gray font-medium text-sm">2</Text>
    </View>
  </View>
</View>
}

const Content = () => {

  return (
    <View className="flex-1 bg-[#1B1E25]">
      <View>
        <LiveMatchCard />
        <LiveMatchCard />
        <LiveMatchCard />
        <LiveMatchCard />
      </View>
    </View>
  );
};


const LiveBetSection = {Header, Content}

export default LiveBetSection;
