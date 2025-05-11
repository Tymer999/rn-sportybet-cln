import { View, Text, ScrollView, Animated, Image } from "react-native";
import React, { useRef } from "react";
import UpcomingMatchCard from "../cards/UpcomingMatchCard";
import { useMatches } from "@/hooks/useMatches";

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

interface FeaturedMatch {
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
  isLive: boolean;
  isBestOdds: boolean,
  isHot: boolean;
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

const gameSortList = [
  {
    id: 1,
    name: "Highlights",
  },
  {
    id: 2,
    name: "Today",
  },
  {
    id: 3,
    name: "Countries",
  },
];

const Header = () => {
  const gamesElements = gamesList.map((game, index) => (
    <Text
      key={index}
      className={`mr-6 ${
        index === 0 ? "text-secondary-dark font-bold" : "text-black font-medium"
      }`}
    >
      {game.name}
    </Text>
  ));

  const betTypesElements = betTypesList.map((game, index) => (
    <View className="flex items-start justify-start flex-1" key={index}>
      <Text className={`text-black px-3 mb-4 text-sm font-bold`}>
        {game.name}
      </Text>

      {index === 0 && <View className="w-full h-1 bg-secondary" />}
    </View>
  ));

  const gameSortElements = gameSortList.map((sort, index) => (
    <View
      className="flex items-center justify-between w-[100%] flex-1 h-[2.55rem]"
      key={index}
    >
      <Text className={`${index === 1 ? "font-bold" : ""}`}>{sort.name}</Text>

      {index === 1 && (
        <View className="w-full h-1 bg-secondary-dark translate-y-[1px]" />
      )}
    </View>
  ));

  return (
    <View className="bg-background-light">
      <View className="flex flex-row items-center gap-4 px-4 py-2">
        <Text className="text-black font-bold text-xl">Sports</Text>
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

      <View className="flex flex-row w-full justify-between border-b border-b-gray overflow-visible mt-4">
        {gameSortElements}
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

      <View className="w-full bg-[#f2f3f4] h-[2.25rem] mt-0 justify-center items-end -translate-y-1 px-3">
        <View className="w-[60%] flex flex-row items-center justify-around">
          <Text className="text-gray font-medium text-sm">1</Text>
          <Text className="text-gray font-medium text-sm">X</Text>
          <Text className="text-gray font-medium text-sm">2</Text>
        </View>
      </View>
    </View>
  );
};

const Content = () => {
  const { matches, loading, error } = useMatches();

  return (
    <View className="flex-1 bg-background-light">
      {(matches.featured as FeaturedMatch[])
        .filter((match) => match.league.includes("Football") && match.isLive === false)
        .map((match, index) => (
          <UpcomingMatchCard match={match} key={index} />
        ))}
    </View>
  );
};

const UpcomingBetSection = { Header, Content };

export default UpcomingBetSection;
