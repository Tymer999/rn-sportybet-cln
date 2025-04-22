import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import TicketScreenHeader from "@/components/sections/TicketScreenHeader";
import TicketMatchCard from "@/components/cards/TicketMatchCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ticketBetsList = [
  {
    id: 1,
  },
  {
    id: 4,
  },
  {
    id: 3,
  },
]

const TicketScreen = () => {
  return (
    <View className="flex-1 bg-background-light">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Ticket Details",
          headerBackTitle: "Back",
          headerTintColor: "#fff", // This changes the back button color
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: "#e51827",
          },
        }}
      />
      <ScrollView>
        <TicketScreenHeader />

        <View className="bg-white">
          {ticketBetsList.map((bet, index) => (
            <TicketMatchCard key={bet.id} />
          ))}
        </View>

        <View>
          <View className="bg-white flex-row items-center justify-between px-4 h-[3.55rem] border-t-[.3px] border-b-gray">
            <Text>Number of Bets: 1</Text>
            <View className="flex-row items-center gap-4">
              <Text className="text-secondary-dark font-medium">Bet Details</Text>
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

          <View className="flex-row items-center justify-center bg-white mt-3 h-[3.55rem]">
            <Text className="text-primary-dark font-medium">Delete Ticket</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TicketScreen;
