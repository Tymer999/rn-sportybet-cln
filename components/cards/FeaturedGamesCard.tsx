import { View, Text, Image, Platform } from "react-native";
import React from "react";
import FeaturedBetButton from "../button/FeaturedBetButton";
const homeTeam = require("../../assets/images/25e40441d42cce317a28037f85af13c1.png");
const awayTeam = require("../../assets/images/62fdb6f4ddbda82f334670205830d44a.png");
const hot = require("../../assets/images/hot.png") // Update the path to the correct location of hot.png
const sportyTv = require("../../assets/images/stv.png") // Update the path to the correct location of hot.png

const FeaturedGamesCard = () => {
  const [isLive, setIsLive] = React.useState(false);
  return (
    <View 
      className="bg-white flex overflow-visible h-[8.35rem]"
      style={{ boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.07), -1px 2px 5px rgba(0, 0, 0, 0.07)" }}
    >
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center">
        <View 
          className="bg-primary flex flex-row items-center gap-1 px-1 w-[4.5rem]" 
          style={{ 
            position: 'relative',
            overflow: 'hidden',
             // Adjusted width to match the other buttons
          }}
        >
          <Text className="italic text-white font-bold z-10 text-nowrap text-sm">HOT</Text>
          <Image source={hot} className="w-4 h-4 z-10" />
          
          <View 
          className="bg-secondary-dark"
            style={{
              position: 'absolute',
              right: -30,
              marginRight: 10,
              top: 0,
              bottom: 0,
              width: 30,
              transform: [{ skewX: '30deg' }],
            }}
          />
        </View>
        <View 
          className="bg-secondary-dark flex flex-row items-center gap-1 px-1 w-[6.5rem]" 
          style={{ 
            position: 'relative',
            overflow: 'hidden',
 // Adjusted width to match the other buttons
          }}
        >
          <Text className="italic text-white font-bold z-10 text-nowrap text-sm" numberOfLines={1}>Best Odds</Text>
          <Image source={hot} className="w-4 h-4 z-10" />
          <View 
            style={{
              position: 'absolute',
              right: -20,
              top: 0,
              bottom: 0,
              width: 25,
              backgroundColor: 'white', // green-600
              transform: [{ skewX: '30deg' }],
            }}
          />
        </View>
       
        </View>
        

        <View>
          <Image source={sportyTv} className="w-4 h-4" />
        </View>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-sm underline flex-shrink ml-2 text-secondary-dark font-medium"
        >
          Football - International Clubs - UEFA Champions League
        </Text>
      </View>

      <View className=" w-full gap-1 mt-1">
        <View className="flex-row items-center w-[77%] mx-auto">
          <Image source={homeTeam} className="w-10 h-10" />

          <View className="flex-1 flex-col ">
            {isLive ? (
              <View className="flex flex-col items-center">
                <Text className="text-black font-bold mb-1">2 - 0</Text>
                <View className="flex flex-row border-gray-light border-[.5px] items-center gap-1 ">
                  <Text className="bg-secondary-light text-secondary-dark font-normal px-1 text-sm">Live</Text>
                  <Text className="text-gray mr-1 text-sm">64:20 h2</Text>
                </View>
              </View>
            ) : (
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-black font-bold text-sm">12:30 AM</Text>
                <View className="bg-gray-light" style={{ width: 1, height: 16 }} />
                <Text className="text-black font-medium text-sm">10/04</Text>
              </View>
            )}
          </View>

          <Image source={awayTeam} className="w-10 h-10" />
        </View>

        <View className="flex-row flex items-center w-full p-2 gap-2">
          <View className="flex flex-1 flex-col items-center gap-2">
            <Text className="text-sm text-gray font-medium">Cerro Porteno</Text>
            <FeaturedBetButton />
          </View>

          <View className="flex flex-1 flex-col items-center gap-2">
            <Text className="text-sm text-secondary-dark font-semibold">1X2</Text>
            <FeaturedBetButton />
          </View>
          <View className="flex flex-1 flex-col items-center gap-2">
            <Text className="text-sm text-gray font-medium">SE Palmeiras</Text>
            <FeaturedBetButton />
          </View>
        </View>
      </View>
      {/* <View className="flex-row w-full h-[10rem] gap-2">
        <View className="flex-1 flex-col items-center h-full" style={{ justifyContent: "flex-end", height: "100%", backgroundColor: "#f8f8f8" }}>  
          <Image source={homeTeam} className="w-16 h-16" />
          <Text>SE Palmeiras</Text>
          <FeaturedBetButton />
        </View>

        <View className="flex-1 flex-col items-center justify-between h-full">
          {isLive ? (
            <View className="flex flex-col items-center">
              <Text>2 - 0</Text>
              <View className="flex flex-row border items-center gap-2 ">
                <Text className="bg-green-400 p-1">Live</Text>
                <Text className="p-1">64:20 h2</Text>
              </View>
            </View>
          ) : (
            <View>
              <Text>12:30 AM</Text>
              <View className="bg-red-700" style={{ width: 1, height: 12 }} />
              <Text>10/04</Text>
            </View>
          )}
          <Text>1X2</Text>
          <FeaturedBetButton />
        </View>

        <View className="flex-1 flex-col items-center justify-between h-full">
          <Image source={awayTeam} className="w-16 h-16" />
          <Text>Cerro Porteno</Text>
          <FeaturedBetButton />
        </View>
      </View> */}
    </View>
  );
};

export default FeaturedGamesCard;
