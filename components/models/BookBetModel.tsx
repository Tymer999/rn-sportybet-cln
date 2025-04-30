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
} from "react-native";
import React, { FC, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/constants/FormatCurrency";

interface BookBetModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const tabList = [
  { name: "Single", id: 1 },
  { name: "Multiple", id: 2 },
  { name: "System", id: 3 },
];

const keyboardValue = {
  topValues: [1, 2, 3, 4, 5, 6],
  buttonValues: [7, 8, 9, 0, ".", "00"],
};

const plusValue = [3, 5, 10];

const BookBetModel: FC<BookBetModelProps> = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const [bookingCode, setBookingCode] = useState("");
  const [bookedGames, setBookedGames] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isStakeFocused, setIsStakeFocused] = useState(false);
  const [stake, setStake] = useState("1.0");
  const [selectedTab, setSelectedTab] = useState<number>(2);

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

  const MatchCard = () => (
    <View className="flex-row items-center gap-2 border-b-[.5px] pb-2 pt-2 pr-4 border-gray-light">
      <MaterialIcons name="close" size={25} color={""} />
      <View className="flex-1">
        <View className="flex-row items-end justify-between">
          <View className="flex-row items-center flex-1 gap-2">
            <Image
              source={require("../../assets/icons/football.png")}
              resizeMode="contain"
              className="w-4 h-4"
            />
            <Text className="font-bold text-black ">Draw</Text>
          </View>
          <Text className="text-black font-bold">3.33</Text>
        </View>

        <View className="flex-row gap-2 my-2">
          <Text className="text-black">Darajani Gogo</Text>
          <Text className="text-gray">vs</Text>
          <Text className="text-black">MOFA FC</Text>
        </View>
        <Text className="text-black mt-1">1X2</Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={onClose}
      transparent
    >
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

          {bookedGames ? (
            <View className="w-full">
              <View className="w-full bg-black pt-4">
                <View className="flex-row items-center justify-between px-4">
                  <View className="flex-row flex-1 items-center gap-2">
                    <View className="w-[1.65rem] h-[1.65rem] items-center justify-center bg-secondary rounded-full">
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
                    <MaterialIcons name="settings" size={16} color={"#fff"} />
                  </View>
                </View>

                <View className="flex-row gap-1 w-full items-end justify-center px-2">
                  {tabElements}
                </View>
              </View>

              <ScrollView className="w-full bg-white max-h-[34rem]">
                <View>
                  <MatchCard />
                  <MatchCard />
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
                    <Text className="text-black font-medium">Total Stake</Text>
                    <View className="flex-row items-center gap-2 mr-4">
                      <Text>GHS</Text>
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
                      <Text className="text-black font-medium">Total Odds</Text>
                      <Text className="text-black font-medium">1.00</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-black font-medium">Max Bonus</Text>
                      <Text className="text-black font-medium">0.73</Text>
                    </View>
                  </View>

                  <View
                    className={`flex-row items-center justify-between bg-secondary-light ${
                      isStakeFocused ? "" : "mb-[6.5rem]"
                    } flex-1 px-2 py-2`}
                  >
                    <Text className="text-black font-bold">Potential Win</Text>
                    <Text className="text-black font-bold ">1.00</Text>
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
                <TouchableWithoutFeedback className="flex-1">
                  <View className="items-center flex-1 bg-secondary-dark justify-center">
                    <Text className="text-white font-bold text-lg">
                      Place Bet
                    </Text>
                    <Text className="text-white">About to pay {stake}</Text>
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
                    <View className="w-[1.65rem] h-[1.65rem] items-center justify-center bg-secondary rounded-full">
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
                    <Text className="text-black font-medium">Multi Maker</Text>
                  </View>
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
                      <Text className="text-black">Ghana</Text>
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
                          setTimeout(() => {
                            setBookedGames(true);
                            setLoading(false);
                          }, 2000);
                        }
                      }}
                    >
                      <View
                        className={`items-center justify-center w-[5.55rem] ${
                          bookingCode.length > 0
                            ? "bg-secondary-dark"
                            : "bg-[#dcdee5]"
                        }`}
                      >
                        {loading ? (
                          <ActivityIndicator />
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
    </Modal>
  );
};

export default BookBetModel;
