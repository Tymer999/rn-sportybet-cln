import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
};

const TicketScreenHeader = () => {
  const [pasteBetModel, setPasteBetModel] = React.useState(false);
  const [betValue, setBetValue] = useState("");

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
      };
    });
  };

  return (
    <>
      <View className="bg-[#292929] px-4 pb-5 pt-3">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm font-medium text-gray">
            Ticket ID: 946694
          </Text>
          <Text className="text-sm font-medium text-gray">17/04, 11:49</Text>
        </View>
        <View className="flex-row items-center justify-between mb-3">
          <TouchableWithoutFeedback onPress={() => setPasteBetModel(true)}>
            <Text className="text-white font-medium text-xl">Multiple</Text>
          </TouchableWithoutFeedback>
          <Text className="text-gray font-medium text-xl">Lost</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-gray text-lg font-medium">Total Return</Text>
          <Text className="text-gray text-xl font-bold">0.00</Text>
        </View>

        <View className="w-full h-[.5px] bg-gray my-3" />

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-gray text-lg font-medium">Total Stake</Text>
          <Text className="text-gray text-lg font-medium">0.10</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-gray text-lg font-medium">Total Odds</Text>
          <Text className="text-gray text-lg font-medium">3.45</Text>
        </View>
      </View>

      <Modal
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
                    multiline
                    numberOfLines={4}
                    placeholderTextColor={"#BDC0C7"}
                    keyboardType="numeric"
                    onFocus={handlePaste}
                  />

                  <View className="bg-[#000] self-start px-3 py-1 rounded-sm mb-3">
                    <Text className="text-white">Multiple</Text>
                  </View>

                  <View className="flex-row w-full gap-2">
                    <TouchableOpacity
                      className="bg-secondary p-4 rounded-2xl flex-1"
                      onPress={() => {
                        const parsedMatches = parseBetValue(betValue);
                        console.log("Parsed matches:", parsedMatches);
                        // Do something with the parsed matches
                        setPasteBetModel(false);
                      }}
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
      </Modal>
    </>
  );
};

export default TicketScreenHeader;
