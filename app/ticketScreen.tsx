import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableWithoutFeedback,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import TicketScreenHeader from "@/components/sections/TicketScreenHeader";
import TicketMatchCard from "@/components/cards/TicketMatchCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MatchDetailsModel from "@/components/models/MatchDetailsModel";
import { useAuth } from "@/context/AuthContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { deleteBet } from "@/services/FirestoreService";

interface Bet {
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
}

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

const TicketScreen = () => {
  const { bet: betParam } = useLocalSearchParams();
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (betParam) {
      const initialBet = JSON.parse(betParam as string);
      setCurrentBet(initialBet);

      // Set up real-time listener
      if (user) {
        const betRef = doc(db, "users", user.uid, "bets", initialBet.id);
        const unsubscribe = onSnapshot(
          betRef,
          (doc) => {
            if (doc.exists()) {
              setCurrentBet({
                id: doc.id,
                ...doc.data(),
              } as Bet);
            }
          },
          (error) => {
            console.error("Error listening to bet updates:", error);
          }
        );

        // Cleanup listener on unmount
        return () => unsubscribe();
      }
    }
  }, [betParam, user]);

  // const handleBetUpdate = (updatedMatches: Match[]) => {
  //   setCurrentBet((prev) =>
  //     prev ? {
  //       ...prev,
  //       matches: updatedMatches
  //     } : null
  //   );
  // };

  const handleDeleteBet = async (betId: string) => {
    Alert.alert("Delete Bet", "Are you sure you want to delete this Ticket?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            if (!user) return;
            await deleteBet(user.uid, betId);
            router.back();
            // No need to manually update bets array as the listener will handle it
          } catch (error) {
            console.error("Error deleting bet:", error);
            Alert.alert("Error", "Failed to delete bet");
          }
        },
      },
    ]);
  };

  if (!currentBet) return null;

  return (
    <View className="flex-1 bg-background-light">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Ticket Details",
          headerBackTitle: "Back",
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: "#e51827",
          },
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#e51827"]} // Android
            tintColor="#e51827" // iOS
          />
        }
      >
        <TicketScreenHeader bet={currentBet} />

        <View className="bg-white">
          {currentBet.matches.map((match, index) => {
            return (
              <TicketMatchCard
                key={match.gameId}
                match={match}
                betId={currentBet.id}
                showBorderB={currentBet.matches.length !== index + 1}
              />
            );
          })}
        </View>

        <View>
          <View className="bg-white flex-row items-center justify-between px-4 h-[3.55rem] border-t-[.3px] border-t-gray-light">
            <Text>Number of Bets: 1</Text>
            <View className="flex-row items-center gap-4">
              <Text className="text-secondary-dark font-medium">
                Bet Details
              </Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={15}
                color={"#0D9737"}
              />
            </View>
          </View>

          <View className="flex-row items-center justify-between px-4 bg-white mt-3 h-[3.55rem]">
            <Text>Check Transaction History</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              color={"#0D9737"}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => handleDeleteBet(currentBet.id)}
          >
            <View className="flex-row items-center justify-center bg-white mt-3 h-[3.55rem]">
              <Text className="text-primary-dark font-medium">
                Delete Ticket
              </Text>
            </View>

          </TouchableWithoutFeedback>
            <View className="w-full h-[10rem]" />
        </View>
      </ScrollView>
    </View>
  );
};

export default TicketScreen;
