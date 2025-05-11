import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import React, { FC, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


interface Match  {
    id: number;
    teams: {
        home: string;
        away: string;
    };
    odds: number;
    pick: string;
    dateTime: string;
    market: string;
    ftScore: string;
}


interface PlacedBetMatchCardProps {
  match: Match,
  index: number
}

const PlacedBetMatchCard: FC<PlacedBetMatchCardProps> = ({match, index}) => {
    const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    liveOdds: "1.00",
    eventTime: "01",
    score: "0:0",
  });

    const isMatchLive = (dateTimeStr: string): boolean => {
    // Parse the date string (format: "01/05 15:00")
    const [datePart, timePart] = dateTimeStr.split(" ");
    const [day, month] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");

    // Create date objects
    const currentDate = new Date();
    const matchDate = new Date();
    const matchEndDate = new Date();

    // Set the match start date
    matchDate.setMonth(parseInt(month) - 1); // Months are 0-based
    matchDate.setDate(parseInt(day));
    matchDate.setHours(parseInt(hours));
    matchDate.setMinutes(parseInt(minutes));
    matchDate.setSeconds(0);

    // Set match end time (130 minutes after start)
    matchEndDate.setTime(matchDate.getTime() + 130 * 60 * 1000);

    // Match is live if current time is between start and end time
    return currentDate >= matchDate && currentDate <= matchEndDate;
  };
  
  return (
    <>
      <View className={`flex-row items-center gap-2 pt-3 pb-10`} key={index}>
        <View className="w-10rem]" style={{ width: 40 }}>
          <MaterialIcons name="schedule" size={20} color={"#353A45"} />
        </View>

        <View className="flex-1">
          {index === 1 && (
            <View
              className="bg-gray-light  mb-2"
              style={{ width: "100%", height: 0.5, opacity: 0.3 }}
            />
          )}
          <View className="gap-2 flex-1">
            <View className="flex flex-row items-center gap-1">
              <Image
                source={require("../../assets/icons/football.png")}
                className="w-5 h-5 opacity-80 border-2 border-white rounded-full"
                resizeMode="contain"
              />
              <Text className="font-semibold text-black">{match.pick}</Text>
              <Text className="font-semibold text-black">
                @{match.odds.toFixed(2)}
              </Text>
              <Text className="text-gray ml-1">{match.market}</Text>
            </View>
            {!isMatchLive(match.dateTime) && (
              <View className="flex-row gap-3">
                <TouchableWithoutFeedback onPress={() => setIsOpen(true)}>
                  <View className="bg-secondary-light">
                    <Text className="text-black">Live Odds</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text className="text-black font-bold">
                  {formData.liveOdds || match.odds}
                </Text>
              </View>
            )}
            <Text className="flex flex-row gap-0">
              <Text className="text-black underline">{match.teams.home} </Text>
              <Text className="text-gray underline">vs</Text>
              <Text className="text-black underline"> {match.teams.away}</Text>
            </Text>
            {!isMatchLive(match.dateTime) ? (
              <View className="flex-row items-center gap-1">
                <Text className="text-secondary-dark ">{formData.eventTime || "00"}' {parseInt(formData.eventTime) > 45 ? "H2" : "H1" }</Text>
                <View
                  className="bg-secondary-dark"
                  style={{ width: 1.5, height: 12, marginTop: 3 }}
                />
                <Text className="text-secondary-dark font-bold">
                  {formData.score || match.ftScore}
                </Text>
              </View>
            ) : (
              <View className="flex flex-row mt-1">
                <Text className="text-gray text-sm">{match.dateTime}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
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
                  <View className="flex-row gap-2 w-full">
                    <TextInput
                      className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px] flex-1"
                      placeholder="Date & Time"
                      placeholderTextColor={"#BDC0C7"}
                      value={formData.liveOdds}
                      onChangeText={(e) =>
                        setFormData({ ...formData, liveOdds: e })
                      }
                      keyboardType="numeric"
                    />
                    <TextInput
                      className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px] flex-1"
                      placeholder="Event time"
                      placeholderTextColor={"#BDC0C7"}
                      value={formData.eventTime}
                      onChangeText={(e) =>
                        setFormData({ ...formData, eventTime: e })
                      }
                      keyboardType="numeric"
                    />
                    <TextInput
                      className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px] flex-1"
                      placeholder="Score"
                      placeholderTextColor={"#BDC0C7"}
                      value={formData.score}
                      onChangeText={(e) =>
                        setFormData({ ...formData, score: e })
                      }
                      keyboardType="default"
                    />
                  </View>

                  <View className="flex-row w-full gap-2">
                    <TouchableOpacity className="bg-secondary p-4 rounded-2xl flex-1">
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

export default PlacedBetMatchCard;
