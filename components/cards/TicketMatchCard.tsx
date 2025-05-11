import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React, { FC, useState } from "react";

// Define or import the Match type
interface Match {
  teams: {
    home: string;
    away: string;
  };
  pick: string;
  odds: number;
  market: string;
  gameId: string;
  dateTime: string;
  ftScore: string;
  outcome?: string;
  matchStatus: "void" | "notStart" | "won" | "lost";
}
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MatchDetailsModel from "../models/MatchDetailsModel";

interface TicketMatchCardProps {
  match: Match;
  betId: string;
  showBorderB: boolean
}

const TicketMatchCard: FC<TicketMatchCardProps> = ({ match, betId, showBorderB }) => {
  const [lastTap, setLastTap] = useState<number>(0);
  const [isClicked, setIsClicked] = useState(false);
  const [matchDetailsModel, setMatchDetailsModel] = useState(false);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setMatchDetailsModel(true);

      setIsClicked(!isClicked);
    }
    setLastTap(now);
  };  

  return (
    <>
      <View className={`flex-row items-center mx-3 pt-3 pb-7 ${showBorderB && "border-b-[.3px] border-b-gray-light"}`}>
        <View className="w-[4rem]">
          {match.matchStatus === "notStart" ? <MaterialIcons name="schedule" size={22} color={"#353A45"} className="opacity-90" /> : match.matchStatus === "lost" ? <MaterialIcons name="cancel" size={22} color={"#f73b48"} /> :  <MaterialIcons name="check-circle" size={22} color={"#0D9737"} />}
        </View>

        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-gray">Game ID: {match.gameId}</Text>
            <View className="w-[1px] h-[.7rem] bg-gray" />
            <Text className="text-sm text-gray">{match.dateTime}</Text>
          </View>

          <View className="flex-row items-center gap-1">
            <Text className="font-normal text-black text-[15px]">
              {match.teams.home}
            </Text>
            <Text className="font-normal text-gray text-[15px]">v</Text>
            <Text className="font-normal text-black text-[15px]">
              {match.teams.away}
            </Text>
          </View>

          <View className="flex-row items-center gap-2 mx-[1px]">
            <Image
              source={require("../../assets/icons/match_tracker.png")}
              resizeMode="contain"
              className="w-4 h-4"
            />

            <Text className="text-secondary-dark text-sm">Match Tracker</Text>
          </View>

          {match.matchStatus !== "notStart" && <View className="flex-row items-center gap-2">
            <Text className="text-gray font-normal text-[13px]">FT Score</Text>
            <Text className="text-[13px]">{match.ftScore}</Text>
          </View>}

          <TouchableWithoutFeedback onPress={handleDoubleTap}>
            <View className={`flex-row  items-center gap-3 p-2 mt-2 ${match.matchStatus === "won" ? "bg-[#d6ebdc]" : "bg-[#f2f3f5]"}`}>
              <View className="items-end gap-[1.75px]">
                <Text className="text-gray text-[13px] font-normal">Pick</Text>
                <Text className="text-gray text-[13px] font-normal">
                  Market
                </Text>

                {(match.matchStatus !== "notStart" && match.outcome)  && <Text className="text-gray text-[13px] font-normal">
                  Outcome
                </Text>}
              </View>
              <View className="gap-[1.75px]">
                <Text className="text-black text-[13px]">
                  {match.pick}@{match.odds.toFixed(2)}
                </Text>
                <Text className="text-black text-[13px]">{match.market}</Text>
                {(match.matchStatus !== "notStart" && match.outcome) &&  <Text className="text-black text-[13px]">{match.outcome}</Text>}
              </View>

              {match.matchStatus === "won" && <Image source={require("../../assets/cup/cup_icon.png")} resizeMode="stretch" className="w-[4rem] h-[3.75rem] z-10 absolute right-4 opacity-10" tintColor={"#0D9737"} />}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <MatchDetailsModel
        isOpen={matchDetailsModel}
        onRequestClose={() => setMatchDetailsModel(false)}
        matchDetails={{
          market: match.market,
          odds: match.odds,
          pick: match.pick,
          outcome: match.outcome ?? "",
          ftScore: match.ftScore,
          status: match.matchStatus,
          gameId: match.gameId,
        }}
        betId={betId}
      />
    </>
  );
};

export default TicketMatchCard;
