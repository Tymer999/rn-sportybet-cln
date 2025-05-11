import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { FC, useCallback, useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/constants/FormatCurrency";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calculateTotalOdds } from "@/utils/utils";
import { placeBet } from "@/services/FirestoreService";
import { formatDateTime } from "@/constants/FormatDateTime";
import Carousel from "react-native-snap-carousel";
import { useRouter } from "expo-router";

interface BookBetModelProps {
  isOpen: boolean;
  onClose: () => void;
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

const tabList = [
  { name: "Single", id: 1 },
  { name: "Multiple", id: 2 },
  { name: "System", id: 3 },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85; // Reduced width to show more of adjacent cards
const NEXT_OFFSET = 50; // How much of next card to show
const PREV_OFFSET = 50; // How much of previous card to show
const SPACING = 2; // Reduced spacing for smaller gaps

const keyboardValue = {
  topValues: [1, 2, 3, 4, 5, 6],
  buttonValues: [7, 8, 9, 0, ".", "00"],
};

const plusValue = [3, 5, 10];

import { ImageSourcePropType } from "react-native";

interface codeHub {
  image: ImageSourcePropType;
}

const codeHubImages = [
  {
    image: require("../../assets/code_hub_images/1.jpg"),
  },
  {
    image: require("../../assets/code_hub_images/2.jpg"),
  },
  {
    image: require("../../assets/code_hub_images/3.jpg"),
  },
  {
    image: require("../../assets/code_hub_images/4.jpg"),
  },
  {
    image: require("../../assets/code_hub_images/5.jpg"),
  },
  {
    image: require("../../assets/code_hub_images/6.jpg"),
  },
  {
    image: require("../../assets/code_hub_images/7.jpg"),
  },
];

const BookBetModel: FC<BookBetModelProps> = ({ isOpen, onClose }) => {
  const { userProfile, user } = useAuth();
  const [bookingCode, setBookingCode] = useState("");
  const [bookedGames, setBookedGames] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isStakeFocused, setIsStakeFocused] = useState(false);
  const [stake, setStake] = useState("1.0");
  const [selectedTab, setSelectedTab] = useState<number>(2);
  const [matches, setMatches] = useState<Array<Match>>([]);
  const [showConfirmModel, setShowConfirmModel] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [maxBunus, setMaxBonus] = useState("0.00");
  const [isLoading, setIsLoading] = useState(false);
  const [showCodes, setShowCodes] = useState<boolean>(true);
  const router = useRouter();
  // ...existing code...

  const handleViewOpenBets = async () => {
    // First clean up the current modal
    await cleanupAndClose();
    // Navigate to open bets screen
    router.push("/openBet");
  };

  const tabElements = tabList.map((tab, index) => (
    <TouchableWithoutFeedback
      className="flex-1"
      key={tab.id}
      onPress={() => setSelectedTab(index + 1)}
    >
      <View
        className={`flex items-center justify-center w-1/3 p-2 h-[2.55rem] ${
          selectedTab === tab.id ? "bg-background-light" : "bg-[#4d515c]"
        } rounded-t-sm`}
      >
        <Text
          className={`${
            selectedTab === tab.id ? "text-black" : "text-white"
          } font-medium`}
        >
          {tab.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  const StakeKeyboard = () => (
    <View className="w-full bg-black pt-2 mt-2">
      <View className="flex-row items-center gap-3 px-2">
        <View className="flex-row flex-1 gap-2">
          {plusValue.map((value, index) => (
            <TouchableWithoutFeedback
              className="flex-1"
              key={index}
              onPress={() =>
                setStake((prevStake) => {
                  const currentValue = parseFloat(prevStake) || 0;

                  return (currentValue + value).toString();
                })
              }
            >
              <View
                key={index}
                className="border border-gray flex-1 items-center justify-center h-[2.25rem] rounded-sm"
              >
                <Text className="text-white">+{value}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <View className="w-3 h-3 bg-white rounded-sm" />
        <Text className="mr-2 text-white font-medium text-sm">
          Update default stake
        </Text>
      </View>

      <View className="flex-row mt-2">
        <View className="flex-1">
          <View className="flex-row flex-1">
            {keyboardValue.topValues.map((value, index) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  setStake((prevStake) => {
                    return prevStake + value;
                  })
                }
                key={index}
              >
                <View className="flex-1 border border-gray-dark items-center justify-center border-l-0 h-[3.55rem]">
                  <Text className="text-white">{value}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View className="flex-row flex-1">
            {keyboardValue.buttonValues.map((value, index) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  setStake((prevStake) => {
                    return prevStake + value;
                  })
                }
                key={index}
              >
                <View className="flex-1 border border-gray-dark items-center justify-center border-l-0 h-[3.55rem]">
                  <Text className="text-white">{value}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
        <View className="w-[6rem]">
          <TouchableWithoutFeedback
            onPress={() =>
              setStake((prevStake) => {
                // Remove last character
                const newValue = prevStake.slice(0, -1);
                // Return "0" if empty, otherwise return new value
                return newValue === "" ? "" : newValue;
              })
            }
          >
            <View className=" items-center justify-center border border-gray-dark border-r-0 h-[3.55rem]">
              <MaterialIcons name="backspace" size={20} color={"#fff"} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setStake("")}>
            <View className=" items-center justify-center border border-gray-dark border-r-0 h-[3.55rem]">
              <Text className="text-white">Clear</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => setIsStakeFocused(false)}>
          <View className="bg-secondary-dark w-[6rem] border border-gray-dark items-center justify-center">
            <Text className="text-white ">Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );

  const getStoredMatches = async () => {
    try {
      const storedBet = await AsyncStorage.getItem("bookedBet");
      const bet = storedBet ? JSON.parse(storedBet) : null;
      if (storedBet) {
        setMatches((bet.bookedMatches as Match[]) || []);
        return setMaxBonus(bet.maxBunus);
      }
      return [];
    } catch (error) {
      console.error("Error retrieving matches from storage:", error);
      return [];
    }
  };

  const MatchCard: FC<{ match: Match }> = ({ match }) => (
    <View className="flex-row items-center gap-2 border-b-[.5px] pb-2 pt-2 pr-4 border-[#e0e4ec]">
      <MaterialIcons name="close" size={25} color={""} />
      <View className="flex-1">
        <View className="flex-row items-end justify-between">
          <View className="flex-row items-center flex-1 gap-2">
            <Image
              source={require("../../assets/icons/football.png")}
              resizeMode="contain"
              className="w-4 h-4"
            />
            <Text className="font-bold text-black ">{match.pick}</Text>
          </View>
          <Text className="text-black font-bold">{match.odds.toFixed(2)}</Text>
        </View>

        <View className="flex-row gap-2 my-2">
          <Text className="text-black">{match.teams.home}</Text>
          <Text className="text-gray">vs</Text>
          <Text className="text-black">{match.teams.away}</Text>
        </View>
        <Text className="text-black mt-1">{match.market}</Text>
      </View>
    </View>
  );

  const cleanupAndClose = useCallback(async () => {
    // Dismiss keyboard first
    Keyboard.dismiss();

    // Reset state in order
    setLoading(false);
    setIsLoading(false);

    // Reset modals
    setShowConfirmModel(false);
    setSuccessModal(false);

    // Reset data
    setBookingCode("");
    setStake("1.0");
    setMatches([]);
    setMaxBonus("0.00");

    // Reset UI states
    setBookedGames(false);
    setIsFocused(false);
    setIsStakeFocused(false);

    // Clear storage last
    try {
      await AsyncStorage.removeItem("bookedBet");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
    // Close modal last
    onClose();
  }, [onClose]);

  const renderCard = useCallback(({ item, index }: { item: codeHub; index: number }) => {
    if (!item) return null;

    return (
      <View key={`carousel-item-${index}`} className="w-full">
        <TouchableWithoutFeedback>
          <View>
            <Image 
              source={item.image}
              resizeMode="contain"
              className="w-full h-[13rem]"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        visible={isOpen}
        onRequestClose={onClose}
        transparent
      >
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex-1 justify-end">
              <TouchableWithoutFeedback onPress={onClose}>
                <View
                  className="flex-1"
                  style={{ backgroundColor: "#000", opacity: 0.5 }}
                />
              </TouchableWithoutFeedback>

              {bookedGames && matches.length > 0 ? (
                <View className="w-full">
                  <View className="w-full bg-black pt-4">
                    <View className="flex-row items-center justify-between px-4">
                      <View className="flex-row flex-1 items-center gap-2">
                        <View className="w-[1.65rem] h-[1.65rem] items-center justify-center bg-secondary-dark rounded-full">
                          <Text className="text-white">{matches.length}</Text>
                        </View>
                        <View className="flex-row h-[1.65rem] w-[6.55rem] rounded-full overflow-hidden border border-gray">
                          <View className="flex-1 bg-secondary-dark rounded-full items-center justify-center">
                            <Text className="text-white">REAL</Text>
                          </View>
                          <View className="flex-1 items-center justify-center">
                            <Text className="text-gray">SIM</Text>
                          </View>
                        </View>

                        <View className="w-[5px] h-[5px] bg-primary -translate-y-[1rem] -translate-x-2 rounded-full" />
                      </View>

                      <View className="flex-1 items-center justify-start">
                        <MaterialIcons
                          name="expand-more"
                          size={35}
                          color={"#fff"}
                          className="-translate-y-[.75rem]"
                        />
                      </View>

                      <View className="flex-1 items-end justify-center">
                        <Text className="text-[#fafd00] font-medium text-[.95rem]">
                          {userProfile?.currency}{" "}
                          {formatCurrency(userProfile?.balance ?? 0)}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center justify-between my-4 px-4">
                      <View className="flex-row gap-2 items-center">
                        <Image
                          source={require("../../assets/icons/bin.png")}
                          resizeMode="contain"
                          className="w-4 h-4"
                        />
                        <Text className="text-sm text-white">Remove All</Text>
                      </View>
                      <View className="flex-row gap-2 items-center">
                        <Text className="text-sm text-white">Bet Settings</Text>
                        <MaterialIcons
                          name="settings"
                          size={16}
                          color={"#fff"}
                        />
                      </View>
                    </View>

                    <View className="flex-row gap-1 w-full items-end justify-center px-2">
                      {tabElements}
                    </View>
                  </View>

                  <ScrollView className="w-full bg-white max-h-[34rem]">
                    {isLoading && (
                      <View className="w-full justify-center items-center">
                        <View className="flex items-center justify-center bg-black w-[7.55rem] h-[7.55rem] rounded-[1.55rem] absolute z-50 top-[3rem]">
                          <ActivityIndicator size={"large"} />
                        </View>
                      </View>
                    )}

                    <View>
                      {matches.map((match, index) => (
                        <MatchCard key={index} match={match} />
                      ))}
                    </View>
                    <View className="pl-2">
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                          <Image
                            source={require("../../assets/icons/bs.png")}
                            resizeMode="stretch"
                            className="w-4 h-4"
                            tintColor={"#0D9737"}
                          />
                          <Text className="text-black font-medium">
                            People also bet on...
                          </Text>
                        </View>
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={30}
                          color={"#0D9737"}
                        />
                      </View>

                      <View className="w-[90%] bg-secondary-light h-[1.25rem] mt-4 rounded-full mx-auto items-center justify-center">
                        <View className="w-[10%] bg-secondary rounded-full absolute z-0 top-0 left-0 h-[1.25rem]" />
                        <Text className="text-secondary-dark z-10 text-center text-xs font-medium">
                          Add more qualifying selection to boost your bonus
                        </Text>
                      </View>

                      <View className="flex-row items-center justify-between mt-3 ml-2">
                        <Text className="text-black font-medium">
                          Total Stake
                        </Text>
                        <View className="flex-row items-center gap-2 mr-4">
                          <Text>{userProfile?.currency}</Text>
                          <TextInput
                            className={`w-[7rem] h-[2rem] px-1 border ${
                              isStakeFocused
                                ? "border-secondary-dark"
                                : "border-gray"
                            } rounded-sm`}
                            showSoftInputOnFocus={false}
                            caretHidden={true}
                            value={stake.toString()}
                            textAlign="right"
                            placeholder="min. 0.1"
                            placeholderTextColor={"red"}
                            onPress={() => setIsStakeFocused((prev) => !prev)}
                          />
                        </View>
                      </View>
                    </View>

                    {isStakeFocused && <StakeKeyboard />}

                    <View className="flex-row items-center justify-between mt-3">
                      <View className="flex-row bg-secondary-dark pr-4 gap-6">
                        <Text className="text-white font-medium ml-2 h-[1rem]">
                          Insure
                        </Text>
                        <MaterialIcons
                          name="info"
                          size={16}
                          color={"#fff"}
                          className="mr-3"
                        />

                        <View
                          style={{
                            position: "absolute",
                            right: -20,
                            top: 0,
                            bottom: 0,
                            width: 25,
                            backgroundColor: "white", // green-600
                            transform: [{ skewX: "-30deg" }],
                          }}
                        />
                      </View>
                      <View className="">
                        <Image
                          source={require("../../assets/icons/flex.jpg")}
                          resizeMode="contain"
                          className="h-[1.30rem] w-[13rem] mr-4"
                        />
                      </View>
                    </View>

                    {/* <View>
                    <Text>Total Stake</Text>
                    <Text>0.00</Text>
                  </View> */}
                    <View className="px-2 gap-2 mt-4">
                      <View className="px-2 gap-2">
                        <View className="flex-row items-center justify-between">
                          <Text className="text-black font-medium">
                            Total Odds
                          </Text>
                          <Text className="text-black font-medium">
                            {calculateTotalOdds(matches).toFixed(2)}
                          </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                          <Text className="text-black font-medium">
                            Max Bonus
                          </Text>
                          <Text className="text-black font-medium">
                            {formatCurrency(
                              parseFloat(stake) * parseFloat(maxBunus)
                            )}
                          </Text>
                        </View>
                      </View>

                      <View
                        className={`flex-row items-center justify-between bg-secondary-light ${
                          isStakeFocused ? "" : "mb-[6.5rem]"
                        } flex-1 px-2 py-2`}
                      >
                        <Text className="text-black font-bold">
                          Potential Win
                        </Text>
                        <Text className="text-black font-bold ">
                          {formatCurrency(
                            calculateTotalOdds(matches) * parseFloat(stake) +
                              parseFloat(stake) * parseFloat(maxBunus)
                          )}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>

                  <View className="bg-white flex-row h-[3.55rem]">
                    <TouchableWithoutFeedback>
                      <View className="bg-[#0a6927] items-center justify-center w-[9rem] ">
                        <Text className="font-bold text-white text-lg">
                          Book Bet
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      className="flex-1"
                      onPress={() => setShowConfirmModel(true)}
                    >
                      <View className="items-center flex-1 bg-secondary-dark justify-center">
                        <Text className="text-white font-bold text-lg">
                          Place Bet
                        </Text>
                        <Text className="text-white">
                          About to pay {formatCurrency(parseFloat(stake))}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  {/* <View className="h-[5rem]" /> */}

                  <SafeAreaView style="" className="bg-[#353a46]">
                    {/* <View className="h-2" /> */}
                  </SafeAreaView>
                </View>
              ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View className="w-full">
                    <View className="flex-row items-center justify-between bg-black px-5 py-4 h-[4.75rem]">
                      <View className="flex-row flex-1 items-center gap-2">
                        <View className="w-[1.65rem] h-[1.65rem] items-center justify-center bg-secondary-dark rounded-full">
                          <Text className="text-white">0</Text>
                        </View>
                        <View className="flex-row h-[1.65rem] w-[6.55rem] rounded-full overflow-hidden border border-gray">
                          <View className="flex-1 bg-secondary-dark rounded-full items-center justify-center">
                            <Text className="text-white">REAL</Text>
                          </View>
                          <View className="flex-1 items-center justify-center">
                            <Text className="text-gray">SIM</Text>
                          </View>
                        </View>

                        <View className="w-[5px] h-[5px] bg-primary -translate-y-[1rem] -translate-x-2 rounded-full" />
                      </View>

                      <View className="flex-1 items-center justify-start">
                        <MaterialIcons
                          name="expand-more"
                          size={35}
                          color={"#fff"}
                          className="-translate-y-[.75rem]"
                        />
                      </View>

                      <View className="flex-1 items-end justify-center">
                        <Text className="text-[#fafd00] font-medium text-[.95rem]">
                          {userProfile?.currency}{" "}
                          {formatCurrency(userProfile?.balance ?? 0)}
                        </Text>
                      </View>
                    </View>

                    <View className="w-full bg-[#e8eaf3] flex-row gap-2 items-center px-4 py-3">
                      <View className="flex-row gap-1 items-center">
                        <Image
                          source={require("../../assets/icons/code_hub.png")}
                          resizeMode="contain"
                          className="w-6 h-6"
                          tintColor={"#353A45"}
                        />
                        <Text className="text-black font-medium">Code Hub</Text>
                      </View>
                      <View className="w-[1.5px] h-[2rem] bg-gray" />

                      <View className="flex-row gap-1 items-center">
                        <Image
                          source={require("../../assets/icons/multi_maker.png")}
                          resizeMode="contain"
                          className="w-5 h-5"
                          tintColor={"#353A45"}
                        />
                        <Text className="text-black font-medium">
                          Multi Maker
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View className="bg-white px-4 pt-2 flex-row items-center justify-between">
                        <Text className="text-black font-medium">
                          Recommended Football Codes
                        </Text>

                        <MaterialIcons
                          name={showCodes ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          color={"#000"}
                          size={25}
                          onPress={() => setShowCodes(prev => !prev)}
                        />
                      </View>

                      {showCodes && (
                        <View
                          className="bg-white w-full"
                          pointerEvents="box-none"
                        >
                          <Carousel
                            data={codeHubImages}
                            renderItem={renderCard}
                            sliderWidth={width}
                            itemWidth={CARD_WIDTH}
                            inactiveSlideScale={0.95}
                            inactiveSlideOpacity={0.8}
                            activeSlideAlignment="center"
                            contentContainerCustomStyle={{
                              paddingHorizontal: SPACING / 2,
                            }}
                            containerCustomStyle={{
                              overflow: 'visible'
                            }}
                            firstItem={0}
                            loop={true}
                            enableSnap={true}
                            autoplay={false}
                            scrollEnabled={true}
                            shouldOptimizeUpdates={true}
                            removeClippedSubviews={false}
                          />
                        </View>
                      )}
                    </View>

                    <View className="bg-white px-4">
                      <View className="flex-row item-center gap-2 py-6">
                        <Text className="text-black font-medium">
                          Please insert booking code
                        </Text>
                        <MaterialIcons
                          name="info-outline"
                          size={16}
                          color={"#353A45"}
                        />
                      </View>

                      <View className="flex-row h-[3.25rem] mb-10">
                        <View className="flex-row gap-2 items-center border border-gray border-r-0 pl-4">
                          <Text className="text-black">{userProfile?.currency === "GHS" ? "Ghana" : "Nigeria"}</Text>
                          <MaterialIcons
                            name="arrow-drop-down"
                            size={30}
                            color={"#9CA0AB"}
                          />
                        </View>

                        <View
                          className={`flex-1 flex-row w-full border ${
                            isFocused ? "border-secondary-dark" : "border-gray"
                          }  items-center pr-1`}
                        >
                          <TextInput
                            placeholder="Booking Code"
                            value={bookingCode}
                            onChangeText={(e) => setBookingCode(e)}
                            keyboardType="default"
                            keyboardAppearance="light"
                            className="flex-1 p-4"
                            spellCheck={false}
                            autoCorrect={false}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholderTextColor={"gray"}
                          />

                          {bookingCode.length > 0 && (
                            <MaterialIcons
                              name="cancel"
                              size={16}
                              color={"#9CA0AB"}
                              onPress={() => setBookingCode("")}
                            />
                          )}
                        </View>

                        <TouchableWithoutFeedback
                          onPress={() => {
                            Keyboard.dismiss();
                            if (bookingCode.length > 5) {
                              setLoading(true);
                              getStoredMatches();
                              setTimeout(() => {
                                setBookedGames(true);
                                setLoading(false);
                              }, 2000);
                            }
                          }}
                        >
                          <View
                            className={`items-center justify-center w-[5.55rem] ${
                              loading
                                ? "bg-secondary"
                                : bookingCode.length > 0
                                ? "bg-secondary-dark"
                                : "bg-[#dcdee5]"
                            }`}
                          >
                            {loading ? (
                              <ActivityIndicator color={"#fff"} />
                            ) : (
                              <Text
                                className={`font-normal text-lg  ${
                                  bookingCode.length > 0
                                    ? "text-white "
                                    : "text-gray "
                                }`}
                              >
                                Load
                              </Text>
                            )}
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>

                    {/* <View className="w-full h-[14.65rem]" /> */}
                    {/* Add SafeAreaView for iPhone home indicator */}
                    <SafeAreaView style="" className="bg-[#353a46]">
                      {/* <View className="h-2" /> */}
                    </SafeAreaView>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </KeyboardAvoidingView>
          <Modal animationType="none" visible={showConfirmModel} transparent>
            <View className="flex-1">
              <TouchableWithoutFeedback
                onPress={() => setShowConfirmModel(false)}
              >
                <View
                  className="flex-1"
                  style={{ backgroundColor: "#000", opacity: 0.5 }}
                />
              </TouchableWithoutFeedback>
              <View className="w-full bg-white pb-2 pt-4 items-center justify-center gap-2">
                <Text className="text-black text-sm">Confirm to Pay</Text>
                <Text className="text-black font-bold text-3xl">
                  {userProfile?.currency} {formatCurrency(parseFloat(stake))}
                </Text>
              </View>
              <View className="bg-white flex-row h-[3.55rem]">
                <TouchableWithoutFeedback>
                  <View className="bg-[#0a6927] items-center justify-center w-[9rem] ">
                    <Text className="font-bold text-white text-lg">Cancel</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  className="flex-1"
                  onPress={async () => {
                    setShowConfirmModel(false);
                    setIsLoading(true);

                    await placeBet(
                      user?.uid ?? "",
                      parseFloat(stake),
                      formatDateTime(new Date()),
                      "688378",
                      "running",
                      parseFloat(maxBunus),
                      matches,
                      bookingCode
                    );
                    setIsLoading(false);
                    setSuccessModal(true);
                  }}
                >
                  <View className="items-center flex-1 bg-secondary-dark justify-center">
                    <Text className="text-white font-bold text-lg">
                      Confirm
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <SafeAreaView style="" className="bg-[#353a46]">
                {/* <View className="h-2" /> */}
              </SafeAreaView>
            </View>
          </Modal>

          <Modal animationType="none" visible={successModal} transparent>
            <View className="flex-1">
              <TouchableWithoutFeedback onPress={() => setSuccessModal(false)}>
                <View
                  className="flex-1"
                  style={{ backgroundColor: "#000", opacity: 0.5 }}
                />
              </TouchableWithoutFeedback>

              <View className="w-full bg-white pt-3">
                <View className="w-full items-center">
                  <MaterialIcons
                    name="check-circle"
                    size={50}
                    color={"#0D9737"}
                  />
                  <Text className="text-black font-bold text-3xl mt-3">
                    Bet Successful
                  </Text>
                </View>

                <View className="w-[85%] mx-auto gap-3 py-4 border-t-[.5px] border-b-[.5px] mt-8 border-[#e9ecf3]">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray font-medium">Total Stake</Text>
                    <Text className="text-black font-bold">
                      {formatCurrency(parseFloat(stake))}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray font-medium">Potential Win</Text>
                    <Text className="text-black font-bold">
                      {formatCurrency(
                        calculateTotalOdds(matches) * parseFloat(stake) +
                          parseFloat(stake) * parseFloat(maxBunus)
                      )}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row">
                      <Text className="text-gray font-medium">
                        Booking Code
                      </Text>
                      <MaterialIcons name="info" size={18} color={"#9CA0AB"} />
                    </View>

                    <View className="flex-row gap-2">
                      <MaterialIcons name="share" size={18} color={""} />
                      <MaterialIcons name="file-copy" size={18} color={""} />
                      <Text className="text-black font-bold">
                        {bookingCode}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-center gap-10 my-11">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm text-secondary-dark font-medium">
                      Reward Progress
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={14}
                      color={"#0D9737"}
                    />
                  </View>
                  <TouchableWithoutFeedback onPress={handleViewOpenBets}>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-sm text-secondary-dark font-medium">
                        View Open Bets
                      </Text>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        size={14}
                        color={"#0D9737"}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View className="bg-white flex-row h-[3.55rem]">
                <TouchableWithoutFeedback
                  onPress={() => setSuccessModal(false)}
                >
                  <View className="bg-[#0a6927] items-center justify-center w-[9rem] ">
                    <Text className="font-bold text-white text-lg">Rebet</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  className="flex-1"
                  onPress={cleanupAndClose}
                >
                  <View className="items-center flex-1 bg-secondary-dark justify-center">
                    <Text className="text-white font-bold text-lg">OK</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <SafeAreaView style="" className="bg-[#353a46]">
                {/* <View className="h-2" /> */}
              </SafeAreaView>
            </View>
          </Modal>
        </>
      </Modal>
    </>
  );
};

export default BookBetModel;
