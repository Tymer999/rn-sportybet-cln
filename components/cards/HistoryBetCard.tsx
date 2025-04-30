import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { FC } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { formatCurrency } from "@/constants/FormatCurrency";
import { calculateTotalOdds } from "@/utils/utils";

interface HistoryBetCardProps {
  bet: {
    id: string;
    ticketId: string;
    dateTime: string;
    stake: number;
    status: "pending" | "running" | "won" | "lost";
    bookingCode: string;
    totalOdds: number;
    potentialReturn: number;
    matches: Array<{
      teams: {
        home: string;
        away: string;
      };
      prediction: string;
      odds: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
  };
  showDate?: boolean;
  isFirst: boolean
}

const HistoryBetCard: FC<HistoryBetCardProps> = ({ bet, showDate, isFirst }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/ticketScreen",
      params: {
        bet: JSON.stringify(bet),
      },
    });
  };

   // Add this function to format the date
   const formatDate = (dateTimeStr: string) => {
    // Format: "27/04, 19:05" -> extract day and month
    const [datePart] = dateTimeStr.split(',');
    const [day, month] = datePart.split('/');
    
    // Convert month number to short name (04 -> Apr)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[parseInt(month) - 1];

    return {
      day: parseInt(day),
      month: monthName
    };
  };

    // Get formatted date from bet.dateTime instead of createdAt
  const { day, month } = formatDate(bet.dateTime);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className={`flex-row mb-3 pt-3 pl-3 ${(showDate && !isFirst) && "border-t-[.3px] border-t-gray-light"}`}>
        {showDate ? (
          <View className="w-[3.25rem]">
            <Text className="text-xl font-bold text-gray">{day}</Text>
            <Text className="text-sm text-gray">{month}</Text>
          </View>
        ) : (
          <View className="w-[3.25rem]" />
        )}

        <View className="flex-1">
          <View
            className={`flex-row items-center justify-between h-[1.75rem] px-1 mr-4 ${
              bet.status === "won"
                ? "bg-secondary-dark"
                : bet.status === "running"
                ? "bg-[#000]"
                : bet.status === "lost"
                ? "bg-gray"
                : ""
            }`}
          >
            <Text className="text-white font-bold text-lg">
              {bet.matches.length === 1 ? "Single" : "Multiple"}
            </Text>
            <View className="flex-row items-center gap-1">
              {bet.status === "won" ? (
                <View className="flex-row items-center gap-1">
                  <Image
                    source={require("../../assets/cup/cup_icon.png")}
                    resizeMode="contain"
                    className="w-7 h-7"
                    tintColor={"white"} 
                  />
                  <Text className="text-white font-bold text-lg">Won</Text>
                </View>
              ) : bet.status === "running" ? (
                <Text className="text-white font-bold text-lg">Running</Text>
              ) : (
                <Text className="text-white font-bold text-lg">Lost</Text>
              )}
              <MaterialIcons
                name="arrow-forward-ios"
                size={15}
                color={"#fff"}
              />
            </View>
          </View>

          <View className="flex mr-8 gap-2 mt-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray">Total Stake(GHS)</Text>
              <Text className="text-black">{formatCurrency(bet.stake)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray">Total Return</Text>
              <Text
                className={`${
                  bet.status === "lost"
                    ? "text-gray"
                    : bet.status === "running"
                    ? "text-black"
                    : "text-secondary-dark"
                } text-xl font-bold`}
              >
                {bet.status === "lost"
                  ? "0.00"
                  : bet.status === "running"
                  ? "--"
                  : formatCurrency(calculateTotalOdds(bet.matches))}
              </Text>
            </View>
          </View>
          <View
            className="bg-gray-light mt-3 mb-3"
            style={{ width: "100%", height: 0.5 }}
          />

          <View className="flex-row items-end mb-3 justify-between mr-8">
            <View className="flex mr-4 gap-1">
              {bet.matches.map(
                (match, index) =>
                  index < 3 && (
                    <Text key={index} className="text-gray">
                      {match.teams.home + " vs " + match.teams.away}
                    </Text>
                  )
              )}
             {bet.matches.length > 3 && <Text className="text-gray">...(and {bet.matches.length - 3} other matches)</Text>}
               {/* <Text className="text-gray">Real Madrid v Arsenal</Text> */}
            </View>

            {bet.status === "running" && (
              <Text className="text-secondary-dark text-sm">Edit Bet</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HistoryBetCard;
