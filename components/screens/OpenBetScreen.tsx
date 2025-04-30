import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PlacedBetCard from "../cards/PlacedBetCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/context/AuthContext";
import { getUserBets } from "@/services/FirestoreService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const openBetTabsList = [
  { name: "All", id: 1 },
  { name: "Cashout Available", id: 2 },
  { name: "Live Games", id: 3 },
];

const OpenBetScreen = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Assuming you have a useAuth hook to get the current user
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      fetchBets().finally(() => setRefreshing(false));
    }, 2000);
  }, []);

  const fetchBets = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const unsubscribe = getUserBets(user.uid, (updatedBets) => {
        setBets(updatedBets);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching bets:", error);
    }
  };
  useEffect(() => {
    fetchBets();
  }, [user]);

  const filteredBets = bets.filter((bet) => {
    if (selectedTab === 1) return bet.status === "running";
    if (selectedTab === 2) return bet.status === "running";
    if (selectedTab === 3) return bet.status === "running"; // For "All" tab
    return true; // For "All" tab
  });
  const openBetTabElements = openBetTabsList.map((tab, index) => (
    <TouchableWithoutFeedback
      key={tab.id}
      onPress={() => setSelectedTab(index + 1)}
    >
      <View
        className={`px-3 py-1 h-[2.25rem] ${
          selectedTab === tab.id ? "bg-black" : "bg-[#dcdee5]"
        } rounded-sm items-center justify-center`}
      >
        <Text
          className={`${selectedTab === tab.id ? "text-white" : "text-black"}`}
        >
          {tab.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  return (
    <View className="w-full h-full bg-background-light">
      <View className="flex flex-row items-center justify-between px-4 py-2">
        <View className="flex flex-row gap-2 ">{openBetTabElements}</View>

        <Ionicons name="grid-sharp" size={20} color={"#9CA0AB"} />
      </View>
      <ScrollView
        className="w-full"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // colors={["#e51827"]} // Android
            // tintColor="#e51827" // iOS
          />
        }
      >
        {loading ? (
          <View className="flex-1 justify-center items-center p-4 h-[60vh]">
            <View className="flex items-center justify-center bg-black w-[8.55rem] h-[8.55rem] rounded-[1.55rem]">
              <ActivityIndicator size={"large"} />
            </View>
          </View>
        ) : filteredBets.length > 0 ? (
          filteredBets.map((bet, index) => (
            <PlacedBetCard key={index} bet={bet} />
          ))
        ) : (
          <View className="items-center justify-center w-full h-[60%]">
            <MaterialIcons name="feedback" size={50} color={"#9CA0AB"} />
            <Text className="text-lg text-gray max-w-[70%] text-center">
              You currently have no Open Bets.
            </Text>
            <Text className="text-lg text-secondary-dark max-w-[80%] my-8">
              What is Cashout?
            </Text>
          </View>
        )}
        <View className="w-full h-[28rem]" />
      </ScrollView>
    </View>
  );
};

export default OpenBetScreen;
