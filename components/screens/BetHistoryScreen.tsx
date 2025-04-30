import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import PlacedBetCard from "../cards/PlacedBetCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HistoryBetCard from "../cards/HistoryBetCard";
import { formatDateTime } from "@/constants/FormatDateTime";
import { getUserBets, placeBet } from "@/services/FirestoreService";
import { useAuth } from "@/context/AuthContext";

const betHistoryTabsList = [
  { name: "Settled", id: 1 },
  { name: "Unsettled", id: 2 },
  { name: "All", id: 3 },
];

type TicketDetails = {
  dateTime: string;
  ticketId: string;
  stake: string;
};

const BetHistoryScreen = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dataChanged, setDateChanged] = useState<boolean>(false);
  const [formData, setFormData] = useState<TicketDetails>({
    dateTime: formatDateTime(new Date()),
    ticketId: "122238",
    stake: "",
  });
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBets = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setTimeout(() => {
        const unsubscribe = getUserBets(user.uid, (updatedBets) => {
          setBets(updatedBets);
          setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, 500);
    } catch (error) {
      console.error("Error fetching bets:", error);
    } 
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBets().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchBets();
  }, [user, dataChanged]);

  const filteredBets = bets.filter((bet) => {
    if (selectedTab === 1) return bet.status !== "running";
    if (selectedTab === 2) return bet.status === "running";
    if (selectedTab === 3) return true; // For "All" tab
    return true; // For "All" tab
  });

  const handleAddTicket = async () => {
    // Handle adding ticket logic here
    await placeBet(
      user?.uid ?? "",
      parseFloat(formData.stake),
      formData.dateTime,
      formData.ticketId
    );
    setDateChanged((prev) => !prev);
    setModalVisible(false);
    setFormData({ ...formData, stake: "" });
  };

  const betHistoryTabElements = betHistoryTabsList.map((tab, index) => (
    <TouchableWithoutFeedback
      key={tab.id}
      onPress={() => setSelectedTab(index + 1)}
    >
      <View
        className={`px-2 py-1 h-[2rem] ${
          selectedTab === tab.id ? "bg-black" : "bg-[#dcdee5]"
        } rounded-xs flex-1 items-center justify-center`}
      >
        <Text
          className={`${
            selectedTab === tab.id ? "text-white" : "text-black"
          } text-sm`}
        >
          {tab.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  const shouldShowDate = (currentBet: any, index: number, bets: any[]) => {
    if (index === 0) return true;
  
    // Handle Firebase Timestamp or regular Date object
    const getCurrentDate = (bet: any) => {
      const date = bet.createdAt?.toDate?.() || new Date(bet.createdAt);
      return date.toDateString();
    };
  
    const currentDate = getCurrentDate(currentBet);
    const previousDate = getCurrentDate(bets[index - 1]);    
  
    // Show date only when it changes (first bet of the day)
    return currentDate !== previousDate;
  };

  return (
    <>
      <View className="w-full h-full bg-background-light">
        <View className="flex flex-row items-center justify-between px-4 py-3 gap-2 bg-white shadow-black shadow-xs">
          <View className="flex-1 flex-row gap-2 ">
            {betHistoryTabElements}
          </View>

          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/cup/cup_icon.png")}
              resizeMode="contain"
              className="w-8 h-8"
              tintColor={"#353A45"}
            />

            <Switch style={{ transform: [{ scale: 0.7 }] }} />
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <MaterialIcons name="more-horiz" size={25} color={"#353A45"} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ScrollView
          className="w-full"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#e51827"]} // Android
              tintColor="#353A45" // iOS
            />
          }
        >
          {loading ? (
            <View className="flex-1 justify-center items-center p-4 h-[55vh]">
              <ActivityIndicator size="large" color="#353A45" />
            </View>
          ) : bets === null ? (
            <View className="flex-1 justify-center items-center p-4">
              <Text>Error loading bets</Text>
            </View>
          ) : filteredBets.length === 0 && !loading ? (
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-lg text-gray max-w-[70%] text-center h-[40vh]">
                           No tickets available
                          </Text>
            </View>
          ) : (
            filteredBets.map((bet, index) => (
              <HistoryBetCard
                key={bet.id || index}
                bet={bet}
                showDate={shouldShowDate(bet, index, filteredBets)}
                isFirst={index === 0}
              />
            ))
          )}
          <View className="w-full h-[28rem]" />
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white w-[80%] rounded-[3rem] p-6">
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="flex-row gap-2 items-center mb-4">
                    <MaterialIcons
                      name="add-circle"
                      size={30}
                      color={"#0D9737"}
                    />
                    <Text className="text-lg font-bold">Add Ticket</Text>
                  </View>

                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Date & Time"
                    placeholderTextColor={"#BDC0C7"}
                    value={formData.dateTime}
                    onChangeText={(e) =>
                      setFormData({ ...formData, dateTime: e })
                    }
                    keyboardType="numeric"
                  />
                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Ticket ID"
                    placeholderTextColor={"#BDC0C7"}
                    value={formData.ticketId}
                    onChangeText={(e) =>
                      setFormData({ ...formData, ticketId: e })
                    }
                    keyboardType="numeric"
                  />
                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Stake"
                    placeholderTextColor={"#BDC0C7"}
                    value={formData.stake}
                    onChangeText={(e) => setFormData({ ...formData, stake: e })}
                    keyboardType="numeric"
                  />

                  <View className="flex-row w-full gap-2">
                    <TouchableOpacity
                      className="bg-secondary p-4 rounded-2xl flex-1"
                      onPress={handleAddTicket}
                    >
                      <Text className="text-white font-bold text-center">
                        Add
                      </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                            className="bg-primary p-4 rounded-2xl flex-1"
                            onPress={() => setModalVisible(false)}
                          >
                            <Text className="text-white font-bold text-center">
                              Close
                            </Text>
                          </TouchableOpacity> */}
                  </View>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default BetHistoryScreen;
