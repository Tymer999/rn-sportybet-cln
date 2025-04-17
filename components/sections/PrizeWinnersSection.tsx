import { View, Text, Dimensions, Animated, Easing } from "react-native";
import React, { useRef, useEffect } from "react";
import GrandPriceCard from "../cards/GrandPriceCard";

const CARD_GAP = 0;
const CARD_WIDTH = 150; // 10rem
const CONTAINER_PADDING = 16;
const DATA = [1, 2, 3, 4, 5];
const VISIBLE_CARDS = DATA.length; // Show 2 full cards and half of third

const PrizeWinnersSection = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  // Quadruple the data to ensure smooth infinite looping
  const loopData = [...DATA, ...DATA, ...DATA, ...DATA];
  
  // Calculate widths
  const singleSetWidth = (CARD_WIDTH + CARD_GAP) * DATA.length;
  const containerWidth = (CARD_WIDTH * VISIBLE_CARDS) + (CARD_GAP * (VISIBLE_CARDS - 1));

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    const startScroll = () => {
      // Start position is one full set width to the right of the visible area
      scrollX.setValue(singleSetWidth);
      
      // Animate through two sets of data (middle sets)
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -singleSetWidth,
            duration: 20000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          // Jump back to starting position instantly but it's not visible
          Animated.timing(scrollX, {
            toValue: singleSetWidth,
            duration: 0,
            useNativeDriver: true,
          })
        ])
      );
      
      animation.start();
    };

    startScroll();

    return () => {
      if (animation) {
        animation.stop();
      }
      scrollX.stopAnimation();
    };
  }, []);

  return (
    <View 
      className="w-full"
      style={{ height: 180 }}
      pointerEvents="box-none"
    >
      <View className="px-4 mb-4">
        <Text className="text-black font-bold text-xl">
          Grand Prize Winners
        </Text>
      </View>

      <View 
        pointerEvents="box-none"
        style={{ 
          flex: 1,
          paddingHorizontal: CONTAINER_PADDING,
          width: containerWidth + (CONTAINER_PADDING * 2),
          overflow: 'hidden'
        }}
      >
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            gap: CARD_GAP,
          }}
          style={[
            { 
              transform: [{ translateX: scrollX }] 
            }
          ]}
        >
          {loopData.map((_, index) => (
            <View 
              key={index}
              style={{ 
                width: CARD_WIDTH,
              }}
              pointerEvents="none"
            >
              <GrandPriceCard />
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default PrizeWinnersSection;
