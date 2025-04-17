import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import Carousel from 'react-native-snap-carousel';
import FeaturedGamesCard from "../cards/FeaturedGamesCard";

interface FeaturedTabs {
  id: number;
  icon: any;
  name: string;
}

const featuredTabs: FeaturedTabs[] = [
  {
    id: 1,
    icon: require("../../assets/game_icons/1bb13bffe71ad5abd3404668611eaef9.png"),
    name: "UEFA Champions League",
  },
  {
    id: 2,
    icon: require("../../assets/game_icons/live.png"),
    name: "Live",
  },
  {
    id: 3,
    icon: require("../../assets/game_icons/1bb13bffe71ad5abd3404668611eaef9.png"),
    name: "Sporty Hero",
  },
  // Add more game tabs as needed
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8; // Reduced width to show more of adjacent cards
const NEXT_OFFSET = 30; // How much of next card to show
const PREV_OFFSET = 20; // How much of previous card to show
const SPACING = 2; // Reduced spacing for smaller gaps

const Featured = () => {
  const [activeTab, setActiveTab] = React.useState(1);

  const cards = [
    { id: '1', title: 'Card 1' },  // Changed to string IDs
    { id: '2', title: 'Card 2' },
    { id: '3', title: 'Card 3' },
  ];

  const renderCard = ({ item }: { item: { id: string; title: string } }) => {
    const cardStyle = {
      width: CARD_WIDTH - SPACING * 2, // Subtract spacing from card width
      marginHorizontal: SPACING, // Add horizontal margin
    };

    // Return the View without destructuring props
    return (
      <View style={cardStyle}>
        <FeaturedGamesCard />
      </View>
    );
  };

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
          {featuredTabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`flex items-center flex-row h-8 justify-center mx-2 border-[1.55px] border-gray bg-white px-2 py-1 rounded-full gap-1`}
            >
              <Image
                source={tab.icon}
                className="w-4 h-4" // Reduced bottom margin
                resizeMode="contain"
              />

              {activeTab === tab.id && (
                <Text className="text-xs text-black text-center font-medium">
                  {tab.name}
                </Text>
              )}

              {activeTab === tab.id && (
                <View className="w-3 h-3 bg-white absolute -bottom-[6px] rotate-45 border-b-[1.55px] border-r-[1.55px] border-gray" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="mt-1">
        <Carousel
          {...{
            data: cards,
            renderItem: renderCard,
            sliderWidth: width,
            itemWidth: CARD_WIDTH,
            inactiveSlideScale: 1,
            inactiveSlideOpacity: 1,
            activeSlideAlignment: "center",
            containerCustomStyle: {
              overflow: 'visible',
              paddingHorizontal: SPACING / 2 // Add padding to container
            },
            contentContainerCustomStyle: {
              paddingLeft: PREV_OFFSET,
              paddingRight: NEXT_OFFSET
            }
          }}
          firstItem={1}
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
