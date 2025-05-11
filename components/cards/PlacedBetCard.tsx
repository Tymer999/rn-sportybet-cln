import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import React, { FC, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Material from "@expo/vector-icons/MaterialIcons";
import { formatCurrency } from "@/constants/FormatCurrency";
import { calculateTotalOdds } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";
import PlacedBetMatchCard from "./PlacedBetMatchCard";

interface PlacedBetCardProps {
  bet: {
    id: number;
    stake: number;
    potentialWin: number;
    matches: Array<{
      id: number;
      teams: {
        home: string;
        away: string;
      };
      odds: number;
      pick: string;
      dateTime: string;
      market: string;
      ftScore: string;
    }>;
  };
}

const PlacedBetCard: FC<PlacedBetCardProps> = ({ bet }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { userProfile } = useAuth();

  const isMatchLive = (dateTimeStr: string): boolean => {
    // Parse the date string (format: "01/05 15:00")
    const [datePart, timePart] = dateTimeStr.split(" ");
    const [day, month] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");

    // Create date objects
    const currentDate = new Date();
    const matchDate = new Date();
    const matchEndDate = new Date();

    // Set the match start date
    matchDate.setMonth(parseInt(month) - 1); // Months are 0-based
    matchDate.setDate(parseInt(day));
    matchDate.setHours(parseInt(hours));
    matchDate.setMinutes(parseInt(minutes));
    matchDate.setSeconds(0);

    // Set match end time (130 minutes after start)
    matchEndDate.setTime(matchDate.getTime() + 130 * 60 * 1000);

    // Match is live if current time is between start and end time
    return currentDate >= matchDate && currentDate <= matchEndDate;
  };

  const isLive = bet.matches.some((match) => isMatchLive(match.dateTime));


  const MatchesElements = bet.matches.map((match, index) => (
    <PlacedBetMatchCard match={match} index={index} key={index} />
  ));

  return (
    <>
      <View
        className="bg-white mx-4 mt-3 px-6 pb-3 pt-2 rounded-sm"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row gap-2">
            <View>
              <Text className="text-lg font-semibold text-black">
                {bet.matches.length === 1 ? "Single" : "Multiple"}
              </Text>
            </View>

            {isLive && (
              <View className="bg-secondary-light pl-[6px] pr-[2px] items-center justify-center">
                <Text className="text-secondary-dark font-bold text-sm">
                  Live
                </Text>
              </View>
            )}
          </View>

          <View className="flex flex-row gap-2 items-center">
            <Ionicons name="share-social" size={18} color={"#0D9737"} />
            <View className="bg-gray" style={{ width: 1, height: 20 }} />
            <Text className="text-secondary-dark ">Edit Bet</Text>
          </View>
        </View>

        <View
          className="bg-gray-light mt-2 mb-2"
          style={{ width: "100%", height: 0.5, opacity: 0.3 }}
        />

        {!expanded ? (
          <TouchableWithoutFeedback onPress={() => setExpanded(true)}>
            <View className="flex flex-row items-start justify-between w-full pt-2">
              <View className="flex-1 pr-2 gap-2">
                <View className="flex flex-row gap-2 flex-1">
                  <Text
                    className="text-black font-medium text-ellipsis"
                    numberOfLines={1}
                  >
                    {bet.matches[0].teams.home}
                  </Text>
                  <Text className="text-gray font-medium ">vs</Text>
                  <Text
                    className="text-black font-medium text-ellipsis flex-1"
                    numberOfLines={1}
                  >
                    {bet.matches[0].teams.away}
                  </Text>
                </View>

                <View className="flex flex-row gap-1">
                  <Text className="text-gray font-medium">Stake</Text>
                  <Text
                    className="text-black font-bold text-ellipsis"
                    numberOfLines={1}
                  >
                    {formatCurrency(bet.stake)}
                  </Text>
                </View>
              </View>
              <View
                style={{ width: 130, borderRadius: 3 }}
                className="flex items-center justify-center p-2 bg-secondary-dark"
              >
                <Text className="text-white font-medium">Cashout</Text>
                <Text className="text-white font-bold">
                  {userProfile?.currency} {formatCurrency(bet.stake)}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View>
            <View>{MatchesElements}</View>

            <TouchableWithoutFeedback
              className="w-full"
              onPress={() => setExpanded(false)}
            >
              <View className="flex flex-row gap-2 items-center justify-end">
                <Text className="text-gray text-sm">Hide Match Details</Text>
                <FontAwesome name="caret-up" size={15} color={"#0D9737"} />
              </View>
            </TouchableWithoutFeedback>
            <View
              className="bg-gray-light mt-2 mb-2"
              style={{ width: "100%", height: 0.5, opacity: 0.3 }}
            />

            <View className="gap-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-black font-normal">Stake</Text>
                <Text className="text-black font-bold opacity-95">
                  {formatCurrency(bet.stake)}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between">
                <Text className="text-black font-normal">Pot. Win</Text>
                <Text className="text-black font-bold opacity-95">
                  {formatCurrency(calculateTotalOdds(bet.matches) * bet.stake)}
                </Text>
              </View>
            </View>

            <View className="mt-2">
              <View className="w-full h-[3.55rem] bg-secondary-dark flex-row items-center gap-1 justify-center">
                <Text className="text-white font-medium">Cashout</Text>
                <Text className="text-white font-bold">
                  {userProfile?.currency} {formatCurrency(bet.stake)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

    
    </>
  );
};

export default PlacedBetCard;
