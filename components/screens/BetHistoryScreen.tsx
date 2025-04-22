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
} from "react-native";
import React, { useState } from "react";
import PlacedBetCard from "../cards/PlacedBetCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HistoryBetCard from "../cards/HistoryBetCard";

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
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [modalVisible, setModalVisible] = React.useState(true);
    const [formData, setFormData] = useState<TicketDetails>({
      dateTime: "",
      ticketId: "",
      stake: "",
    });
 

  const handleAddTicket = () => setModalVisible(true);

  const betHistoryTabElements = betHistoryTabsList.map((tab, index) => (
    <TouchableWithoutFeedback
      key={tab.id}
      onPress={() => setSelectedTab(index + 1)}
    >
      <View
        className={`px-2 py-2 ${
          selectedTab === tab.id ? "bg-black" : "bg-gray-light"
        } rounded-sm flex-1 items-center justify-center`}
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
    <>
      <View className="w-full h-full bg-background-light">
        <View className="flex flex-row items-center justify-between px-4 py-2 gap-2">
          <View className="flex-1 flex-row gap-2 ">
            {betHistoryTabElements}
          </View>

          <View className="flex flex-row gap- items-center">
            <Image
              source={require("../../assets/icons/f1bf2083a8161d46dd3ad42b3bbba5f1.png")}
              resizeMode="contain"
              className="w-6 h-6"
              tintColor={"#353A45"}
            />

            <Switch style={{ transform: [{ scale: 0.7 }] }} />
            <TouchableWithoutFeedback onPress={handleAddTicket}>
              <MaterialIcons name="more-horiz" size={25} color={"#353A45"} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ScrollView className="w-full">
          <HistoryBetCard />
          <HistoryBetCard />
          <View className="w-full h-[28rem]" />
        </ScrollView>
      </View>

      <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                          onChangeText={(e) =>
                            setFormData({ ...formData, stake: e })
                          }
                          keyboardType="numeric"
                        />
      
                        <View className="flex-row w-full gap-2">
                          <TouchableOpacity
                            className="bg-secondary p-4 rounded-2xl flex-1"
                            onPress={() => {
                              console.log(formData);
                              setModalVisible(false);
                            }}
                          >
                            <Text className="text-white font-bold text-center">
                              Add
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            className="bg-primary p-4 rounded-2xl flex-1"
                            onPress={() => setModalVisible(false)}
                          >
                            <Text className="text-white font-bold text-center">
                              Close
                            </Text>
                          </TouchableOpacity>
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
