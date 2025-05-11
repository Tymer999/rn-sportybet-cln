import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/constants/FormatCurrency";

interface GrandPriceCardProps {
  number: string,
  amount: number,
  time: string
}

const GrandPriceCard: FC<GrandPriceCardProps> = ({number, amount, time}) => {
  const {userProfile} = useAuth();
  return (
    <View style={{ pointerEvents: 'none' }}>
      <View className="bg-black py-2 px-4 rounded-sm rounded-br-[2.5rem] w-[10rem] relative gap-1 overflow-hidden">
        <Text className="text-white text-xs z-30" numberOfLines={1}>{number} won</Text>
        <Text className="text-secondary-dark text-lg font-bold italic text-nowrap shrink-0 z-30" numberOfLines={1}>
          {userProfile?.currency} {formatCurrency(amount)}
        </Text>
        <Text className="text-white text-xs z-30" numberOfLines={1}>in Sports</Text>

        <Image
          source={require("../../assets/icons/cup.png")}
          resizeMode="contain"
          className="h-[4.5rem] w-[4.5rem] absolute right-0 top-0 z-0"
        />
      </View>

      <Text className="text-sm text-gray">{time} ago</Text>
    </View>
  );
};

export default GrandPriceCard;
