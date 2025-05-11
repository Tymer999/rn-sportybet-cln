import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Image,
  TextInput,
  Platform,
  Keyboard,
  ImageBackground,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { FC, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomSingleInputModel from "../models/StakeModel";
import {
  addMatchesToBet,
  updateTicketDetails,
} from "@/services/FirestoreService";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/constants/FormatCurrency";
import { calculateTotalOdds } from "@/utils/utils";
import AddBetModel from "../models/AddBetModel";

type Match = {
  teams: {
    home: string;
    away: string;
  };
  pick: string;
  odds: number;
  market: string;
  gameId: string;
  dateTime: string;
  outcome?: string;
  ftScore: string;
  matchStatus: "void" | "notStart" | "won" | "lost";
};

interface TicketScreenHeaderProps {
  bet: {
    id: string;
    totalOdds: number;
    maxBunus: number;
    stake: number;
    potentialReturn: number;
    bookingCode: string;
    ticketId: string;
    dateTime: string;
    status: "running" | "notStart" | "won" | "lost";
    matches: Array<Match>;
    createdAt: Date;
    updatedAt: Date;
  };
}

const TicketScreenHeader: FC<TicketScreenHeaderProps> = ({ bet }) => {
  const [pasteBetModel, setPasteBetModel] = React.useState(false);
  const [stakeModal, setStakeModal] = React.useState(false);
  const [ticketIdModel, setTicketIdModel] = React.useState(false);
  const [dateTimeModel, setDateTimeModel] = React.useState(false);
  const [bookingCodeModal, setBookingCodeModal] = React.useState(false);
  const [betValue, setBetValue] = useState("");
  const [maxBunus, setMaxBonus] = useState("0.10");
  const { user } = useAuth();

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      // Here you can add logic to parse the bet text
      setBetValue(text);
    }
  };

  const parseBetValue = (text: string): Match[] => {
    // Split by "Game ID:" to separate matches
    const matches = text.split("Game ID:").filter(Boolean);

    return matches.map((match) => {
      const lines = match.split("\n").map((line) => line.trim());

      // Get Game ID and DateTime from the first line since it contains these after splitting
      const [gameId, dateTime] = lines[0].split("|").map((item) => item.trim());

      // Remove empty lines and get remaining content
      const cleanLines = lines.filter((line) => line.length > 0);

      // First line after removing empty lines should be teams
      const teamsLine = cleanLines.find((line) => line.includes(" v ")) || "";
      const [homeTeam, awayTeam] = teamsLine
        .split(" v ")
        .map((team) => team.trim());

      // Find pick and odds
      const pickLine =
        cleanLines.find((line) => line.includes("Pick"))?.split("@") || [];
      const pick = pickLine[0]?.replace("Pick", "").trim();
      const odds = parseFloat(pickLine[1] || "0");

      // Find market
      const market =
        cleanLines
          .find((line) => line.includes("Market"))
          ?.replace("Market", "")
          .trim() || "";

      // Get FT Score if available
      // Get FT Score - modified to check next line
      const ftScoreIndex = cleanLines.findIndex((line) =>
        line.includes("FT Score:")
      );
      let ftScore = "0:0";
      if (ftScoreIndex !== -1 && ftScoreIndex + 1 < cleanLines.length) {
        const scoreLine = cleanLines[ftScoreIndex + 1].trim();
        // Check if the next line contains numbers and colon (e.g., "2:1")
        if (/^\d+:\d+$/.test(scoreLine)) {
          ftScore = scoreLine;
        }
      }

      // Get outcome if available
      const outcomeLine = cleanLines.find((line) => line.includes("Outcome"));

      const outcome = outcomeLine
        ? outcomeLine.replace("Outcome", "").trim()
        : "";

      return {
        teams: {
          home: homeTeam,
          away: awayTeam,
        },
        pick,
        odds,
        market,
        gameId,
        dateTime,
        ftScore,
        outcome,
        matchStatus: "won", // Default status
      };
    });
  };

  const handleUpdateMatches = async () => {
    try {
      if (!user || !betValue) return;

      const parsedMatches = parseBetValue(betValue);
      await addMatchesToBet(user.uid, bet?.id, parsedMatches);

      setPasteBetModel(false);
      setBetValue("");
    } catch (error) {
      console.error("Error updating matches:", error);
      // Handle error (show alert, etc.)
    }
  };

  const handleStakeUpdate = async (newStake: string) => {
    try {
      if (!user) return;
      const stake = parseFloat(newStake);

      await updateTicketDetails(user.uid, bet.id, { stake });

      setStakeModal(false);
    } catch (error) {
      console.error("Error updating stake:", error);
    }
  };

  const handleTicketIdUpdate = async (newTicketId: string) => {
    try {
      if (!user) return;

      await updateTicketDetails(user.uid, bet.id, { ticketId: newTicketId });

      // Update local state
      setTicketIdModel(false);
    } catch (error) {
      console.error("Error updating ticket ID:", error);
    }
  };

  const handleDateTimeUpdate = async (newDateTime: string) => {
    try {
      if (!user) return;

      await updateTicketDetails(user.uid, bet.id, { dateTime: newDateTime });

      // Update local state

      setDateTimeModel(false);
    } catch (error) {
      console.error("Error updating date/time:", error);
    }
  };

  const handleBookingCodeUpdate = async (newBookingCode: string) => {
    try {
      if (!user) return;

      await updateTicketDetails(user.uid, bet.id, {
        bookingCode: newBookingCode,
      });

      // Update local state

      setBookingCodeModal(false);
    } catch (error) {
      console.error("Error updating date/time:", error);
    }
  };

  return (
    <>
      <View
        className={`bg-[#1b1e25] ${
          bet.status === "running"
            ? "pb-3"
            : bet.status === "won"
            ? "pb-0"
            : "pb-6"
        } pt-3`}
      >
        <View className="flex-row items-center justify-between mb-3 px-4">
          <TouchableWithoutFeedback onPress={() => setTicketIdModel(true)}>
            <Text className="text-sm font-medium text-gray">
              Ticket ID: {bet.ticketId}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setDateTimeModel(true)}>
            <Text className="text-sm font-medium text-gray">
              {bet.dateTime}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View className="flex-row items-center justify-between px-4">
          <TouchableWithoutFeedback onPress={() => setPasteBetModel(true)}>
            <Text className="text-white font-medium text-lg">
              {bet.matches.length === 1 ? "Single" : "Multiple"}
            </Text>
          </TouchableWithoutFeedback>
          {bet.status === "lost" ? (
            <Text className="text-gray font-medium text-lg">Lost</Text>
          ) : bet.status === "running" ? (
            <View className="flex-row gap-3 items-center">
              <View className="border items-center justify-center border-secondary-dark px-2 py-1 rounded-sm">
                <Text className="text-secondary-dark font-semibold">
                  Edit Bet
                </Text>
              </View>
              <Text className="text-white font-medium text-lg">Running</Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/cup/cup_icon.png")}
                resizeMode="contain"
                className="w-8 h-7"
                tintColor={"#32CE62"}
              />
              <Text className="text-secondary font-medium text-lg">Won</Text>
            </View>
          )}
        </View>
        <View className="flex-row items-center justify-between mt-2 px-4">
          <Text className="text-gray text-[15px]">Total Return</Text>
          {bet.status === "lost" ? (
            <Text className="text-gray text-xl font-bold">0.00</Text>
          ) : bet.status === "running" ? (
            <Text className="text-gray text-xl font-bold">--</Text>
          ) : (
            <Text className="text-secondary text-xl font-bold">
              {formatCurrency(
                calculateTotalOdds(bet.matches) * bet.stake +
                  bet.maxBunus * bet.stake
              )}
            </Text>
          )}
        </View>
        <View className="px-4">
          <View className="w-[100%] h-[.5px] bg-[#353a45] my-3" />
        </View>

        <TouchableWithoutFeedback onPress={() => setStakeModal(true)}>
          <View className="flex-row items-center justify-between mb-[5px] px-4">
            <Text className="text-gray text-[15px]">Total Stake</Text>
            <Text className="text-white text-[15px]">
              {bet.stake.toFixed(2)}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View className="flex-row items-center justify-between px-4">
          <Text className="text-gray text-[15px]">Total Odds</Text>
          <Text className="text-white text-[15px]">
            {calculateTotalOdds(bet.matches).toFixed(2)}
          </Text>
        </View>

        {bet.status === "won" && (
          <View>
            <View className="flex-row items-center justify-between mt-2 px-4">
              <Text className="text-gray text-[15px]">Max. Bonus</Text>
              <Text className="text-white text-[15px]">
                {bet.maxBunus.toFixed(2)}
              </Text>
            </View>

            <View>
              <ImageBackground
                source={require("../../assets/banners/congratulations.png")}
                resizeMode="stretch"
                className="w-full h-[5.75rem] flex-row items-center justify-between px-4"
              >
                <View className="pl-[4.55rem]">
                  <Text className="text-white font-bold text-lg">
                    Congratulations!
                  </Text>
                  <Text className="text-[#f1c447] font-bold text-lg">
                    "{"Tymer999"}"
                  </Text>
                  <Text className="text-white font-bold text-lg">
                    You are Amazing!
                  </Text>
                </View>

                <View className="items-center justify-center px-2 py-2 bg-[#e0ad20] rounded-sm h-[3.15rem] w-[8.55rem]">
                  <Text className="text-[#000] font-bold">Show Off</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        )}
        {bet.status === "running" && (
          <View className="mt-[4.55px] gap-[5px] px-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray text-[15px]">Max Bonus</Text>
              <Text className="text-white text-[15px]">{formatCurrency(bet.maxBunus * bet.stake)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray text-[15px]">Total Pot. Win</Text>
              <Text className="text-white text-[15px]">
                {formatCurrency(calculateTotalOdds(bet.matches) * bet.stake)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between border-t-[.7px] border-t-[#353a45] pt-3 mt-5">
              <View className="flex-row items-center gap-2">
                <View>
                  <Text className="text-gray text-xs font-medium">
                    Booking Code
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() => setBookingCodeModal(true)}
                  >
                    <Text className="text-lg font-medium text-white">
                      {bet.bookingCode}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
                <MaterialIcons name="copy-all" size={22} color={"white"} />
                <MaterialIcons name="share" size={22} color={"white"} />
              </View>

              <View className="flex-row items-center gap-2">
                <MaterialIcons name="info" size={16} color={"#9CA0AB"} />
                <View className="items-center justify-center px-2 py-2 bg-secondary-dark rounded-sm h-[3.15rem] w-[7rem]">
                  <Text className="text-white font-medium">Rebet</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      <CustomSingleInputModel
        isOpen={stakeModal}
        onRequestClose={() => setStakeModal(false)}
        type="stake"
        onSubmit={(stake) => handleStakeUpdate(stake)}
        initialValue={bet.stake.toString()}
      />

      <CustomSingleInputModel
        isOpen={ticketIdModel}
        onRequestClose={() => setTicketIdModel(false)}
        type="ticketId"
        onSubmit={(ticketId) => handleTicketIdUpdate(ticketId)}
        initialValue={bet.ticketId}
      />

      <CustomSingleInputModel
        isOpen={dateTimeModel}
        onRequestClose={() => setDateTimeModel(false)}
        type="dateTime"
        onSubmit={(dateTime) => handleDateTimeUpdate(dateTime)}
        initialValue={bet.dateTime}
      />

      <CustomSingleInputModel
        isOpen={bookingCodeModal}
        onRequestClose={() => setBookingCodeModal(false)}
        type="bookingCode"
        onSubmit={(bookingCode) => handleBookingCodeUpdate(bookingCode)}
        initialValue={bet.bookingCode}
      />

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={pasteBetModel}
        onRequestClose={() => setPasteBetModel(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPasteBetModel(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white w-[75%] rounded-[3rem] p-6">
                <View>
                  <View className="flex-row gap-2 items-center mb-4">
                    <MaterialIcons
                      name="add-circle"
                      size={30}
                      color={"#0D9737"}
                    />
                    <Text className="text-lg font-bold">Paste Bet</Text>
                  </View>

                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Value"
                    value={betValue}
                    onChangeText={setBetValue}
                    placeholderTextColor={"#BDC0C7"}
                    keyboardType="numeric"
                    onFocus={handlePaste}
                  />

                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Max. Bonus"
                    value={maxBunus}
                    onChangeText={(e) => setMaxBonus(e)}
                    placeholderTextColor={"#BDC0C7"}
                    keyboardType="numeric"
                  />

                  <View className="bg-[#000] self-start px-3 py-1 rounded-sm mb-3">
                    <Text className="text-white">Multiple</Text>
                  </View>

                  <View className="flex-row w-full gap-2">
                    <TouchableOpacity
                      className="bg-secondary p-4 rounded-2xl flex-1"
                      onPress={handleUpdateMatches}
                    >
                      <Text className="text-white font-bold text-center">
                        Update
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal> */}

      <AddBetModel
        isOpen={pasteBetModel}
        onClose={() => setPasteBetModel(false)}
        bet={bet}
      />
    </>
  );
};

export default TicketScreenHeader;
