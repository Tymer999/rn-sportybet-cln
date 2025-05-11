import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import FeaturedGamesCard from "../cards/FeaturedGamesCard";
import { useMatches } from "@/hooks/useMatches";

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

  score: string,
  eventTime: string,
  matchStatus: string
}


// const featuredTabs: FeaturedTabs[] = [
//   {
//     id: 1,
//     icon: require("../../assets/game_icons/1bb13bffe71ad5abd3404668611eaef9.png"),
//     name: "UEFA Champions League",
//   },
//   {
//     id: 2,
//     icon: require("../../assets/game_icons/live.png"),
//     name: "Live",
//   },
//   {
//     id: 3,
//     icon: require("../../assets/game_icons/1bb13bffe71ad5abd3404668611eaef9.png"),
//     name: "Sporty Hero",
//   },
//   // Add more game tabs as needed
// ];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8; // Reduced width to show more of adjacent cards
const NEXT_OFFSET = 30; // How much of next card to show
const PREV_OFFSET = 20; // How much of previous card to show
const SPACING = 2; // Reduced spacing for smaller gaps

const Featured = () => {
  const { matches, loading, error } = useMatches();
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  

  // const cards = [
  //   { id: "1", title: "Card 1" }, // Changed to strinindexg IDs
  //   { id: "2", title: "Card 2" },
  //   { id: "3", title: "Card 3" },
  // ];

    // Function to check if league names match (case insensitive)
    const isLeagueMatch = (cardLeague: string, categoryLeague: string) => {
      return cardLeague.toLowerCase().includes(categoryLeague.toLowerCase());
    };

    
  // Update this function to set active tab based on card league
  const updateActiveTabFromCard = (index: number) => {
    const currentCard = matches.featured[index];
    if (!currentCard) return;

    // Find matching category index
    const matchingCategoryIndex = matches.categories.findIndex(category => 
      isLeagueMatch(currentCard.league, category.leagueName)
    );

    // Update active tab if found, otherwise keep current
    if (matchingCategoryIndex !== -1) {
      setActiveTab(matchingCategoryIndex);
    }
  };

  useEffect(() => {
    if (matches?.featured?.length > 0 && matches?.categories?.length > 0) {
      // console.log("Active Card Index:", matches.featured);
      // console.log("Active Tab:", matches.categories[0]);
      
      updateActiveTabFromCard(activeCardIndex);
    }
  }, [matches, activeCardIndex]);

  // console.log({activeCard: matches.featured[activeCardIndex] , activeTab: matches.categories[activeTab]});
  

  const renderCard = ({ item, index }: { item: FeaturedMatch, index: number }) => {
    if (!item) return null;

    // Return the View without destructuring props
    {
      return (
        <FeaturedGamesCard match={item} key={index} index={index} />
      );
    }
  };

   // Handle loading state
   if (loading) {
    return (
      <View className="mb-2 items-center justify-center">
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View className="mb-2 items-center justify-center">
        <Text>Failed to load featured matches</Text>
      </View>
    );
  }

  return (
    <View className="mb-2">
      <View className="flex flex-row items-center gap-3 px-4 mt-4">
        <Text className="font-bold text-lg">Featured</Text>
        <View className="bg-gray-light" style={{ width: 1, height: 16 }} />
        <View className="flex flex-row gap-6">
          <Text className="text-secondary-dark font-bold">Matches</Text>
          <Text className="text-black font-medium">Games</Text>
          <Text className="text-black font-medium">Codes</Text>
        </View>
      </View>

      <View className="w-full h-12 bg-transparent mt-4 mx-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-none py-1 overflow-visible" // Removed w-full and adjusted padding
        >
          {matches.categories.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(index)}
              className={`flex items-center flex-row h-8 justify-center mx-2 border-[1.55px] border-gray bg-white px-2 py-1 rounded-full gap-1 ${activeTab !== index && "opacity-50"}`}
            >
              <Image
                source={{uri: tab.leagueIcon}}
                className="w-4 h-4" // Reduced bottom margin
                resizeMode="contain"
              />

              {activeTab === index && (
                <Text className="text-xs text-black text-center font-medium">
                  {tab.leagueName}
                </Text>
              )}

              {activeTab === index && (
                <View className="w-3 h-3 bg-white absolute -bottom-[6px] rotate-45 border-b-[1.55px] border-r-[1.55px] border-gray" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="mt-1">
        <Carousel
          {...{
            data: matches.featured || [],
            renderItem: renderCard,
            sliderWidth: width,
            itemWidth: CARD_WIDTH,
            keyExtractor: (item, index) => index.toString(), // Convert index to string
            inactiveSlideScale: 0.95,
            inactiveSlideOpacity: 0.8,
            onSnapToItem: (index) => {
              setActiveCardIndex(index);
              updateActiveTabFromCard(index);
            },
            activeSlideAlignment: "center",
            containerCustomStyle: {
              overflow: "visible",
              paddingHorizontal: SPACING / 2, // Add padding to container
            },
            contentContainerCustomStyle: {
              paddingLeft: PREV_OFFSET,
              paddingRight: NEXT_OFFSET,
            },
          }}
          firstItem={0}
          loop={true}
          enableSnap={true}
          autoplay={false}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default Featured;
