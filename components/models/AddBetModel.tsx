import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { FC, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { addMatchesToBet } from "@/services/FirestoreService";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AddBetModelProps {
  isOpen: boolean;
  onClose: () => void;
  bet?: any;
  isBookBet?: boolean;
}

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

const AddBetModel: FC<AddBetModelProps> = ({
  isOpen,
  onClose,
  bet,
  isBookBet,
}) => {
  const [maxBunus, setMaxBonus] = useState("0.10");
  const { user } = useAuth();

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
        matchStatus: isBookBet? "notStart" : "won", // Default status
      };
    });
  };

  const handleUpdateMatches = async () => {
    try {
      if (!user || !betValue) return;

      const parsedMatches = parseBetValue(betValue);

      if (isBookBet) {        

        await AsyncStorage.setItem( 
          'bookedBet',
          JSON.stringify({
            bookedMatches: parsedMatches,
            maxBunus: maxBunus
          })
        );

        onClose();
       return setBetValue("");
      }
      await addMatchesToBet(user.uid, bet?.id, parsedMatches);

      onClose();
      setBetValue("");
    } catch (error) {
      console.error("Error updating matches:", error);
      // Handle error (show alert, etc.)
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
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

                {isBookBet && <TextInput
                  className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                  placeholder="Max. Bonus"
                  value={maxBunus}
                  onChangeText={(e) => setMaxBonus(e)}
                  placeholderTextColor={"#BDC0C7"}
                  keyboardType="numeric"
                />}

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
    </Modal>
  );
};

export default AddBetModel;
