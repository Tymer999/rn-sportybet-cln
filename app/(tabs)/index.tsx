import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import Header from "@/components/sections/Header";
import { StatusBar } from "expo-status-bar";
import TopCarousel from "@/components/sections/TopCarousel";
import AllGamesTab from "@/components/sections/AllGamesTab";
import GameTab from "@/components/sections/GameTab";
import Featured from "@/components/sections/Featured";
import LiveBetSection from "@/components/sections/LiveBetSection";
import UpcomingBetSection from "@/components/sections/UpcomingBetSection";
import SelectedBetQuantityButton from "@/components/button/SelectedBetQuantityButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PrizeWinnersSection from "@/components/sections/PrizeWinnersSection";
import ShowCupModal from "@/components/models/ShowCupModal";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  

  const sections = [
    { type: 'carousel', key: 'carousel' },
    { type: 'allGames', key: 'allGames' },
    { type: 'gameTab', key: 'gameTab' },
    { type: 'featured', key: 'featured' },
    { type: 'liveHeader', key: 'liveHeader', sticky: true },
    { type: 'liveContent', key: 'liveContent' },
    { type: 'liveViewMore', key: 'liveViewMore', sticky: true },
    { type: 'upcomingHeader', key: 'upcomingHeader', sticky: true },
    { type: 'upcomingContent', key: 'upcomingContent' },
    { type: 'upcomingViewMore', key: 'upcomingViewMore' },
    { type: 'prizeWinners', key: 'prizeWinners' },
    { type: 'spacer', key: 'spacer' },
  ];

  const renderItem = ({ item }: { item: { type: string; key: string; sticky?: boolean } }) => {
    switch (item.type) {
      case 'carousel':
        return <TopCarousel />;
      case 'allGames':
        return <AllGamesTab />;
      case 'gameTab':
        return <GameTab />;
      case 'featured':
        return <Featured />;
      case 'liveHeader':
        return <LiveBetSection.Header />;
      case 'liveContent':
        return <LiveBetSection.Content />;
      case 'liveViewMore':
        return (
          <View className="w-full px-8 pb-4 pt-2 flex flex-row items-center justify-end gap-1 bg-[#1B1E25]">
            <Text className="text-secondary-dark">All Live Events 97</Text>
            <FontAwesome name="chevron-right" size={15} color="#0D9737" />
          </View>
        );
      case 'upcomingHeader':
        return <UpcomingBetSection.Header />;
      case 'upcomingContent':
        return <UpcomingBetSection.Content />;
      case 'upcomingViewMore':
        return (
          <View className="w-full px-8 pb-4 pt-2 flex flex-row items-center justify-end gap-1 bg-background-light">
            <Text className="text-secondary-dark">View More</Text>
            <FontAwesome name="chevron-right" size={15} color="#0D9737" />
          </View>
        );
      case 'spacer':
        return <View className="w-full h-[1rem]" />;
      case 'prizeWinners':
        return <PrizeWinnersSection />;
      default:
        return null;
    }
  };

  return (
    <View
      className="flex-1 w-full h-full bg-background-light"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <View className="w-full h-14 bg-primary" />
      <Header />
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        className="bg-transparent flex-1 w-full h-full"
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={true}
        stickyHeaderIndices={sections
          .map((item, index) => (item.sticky ? index : null))
          .filter(index => index !== null)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={['#353A45']}
            // tintColor="#353A45"
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 2000);
            }}
          />
        }
      />
      
      {/* <ShowCupModal isOpen={true} onClose={() => {}} bet={} /> */}
      <SelectedBetQuantityButton />
      <StatusBar backgroundColor="red" style="light" />
    </View>
  );
};

export default HomeScreen;
