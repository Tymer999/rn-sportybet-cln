import { View, Text, Modal, Image } from "react-native";
import React, { FC } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";
import { calculateTotalOdds } from "@/utils/utils";
import { formatCurrency } from "@/constants/FormatCurrency";

type Bet = {
  id: string;
  ticketId: string;
  dateTime: string;
  stake: number;
  status: "pending" | "running" | "won" | "lost";
  bookingCode: string;
  totalOdds: number;
  potentialReturn: number;
  matches: Array<{
    teams: {
      home: string;
      away: string;
    };
    prediction: string;
    odds: number;
  }>;
  maxBunus: number
  createdAt: Date;
  updatedAt: Date;
};

interface ShowCupModalProps {
  isOpen: boolean;
  onClose: () => void;
  bet: Bet
}

const ShowCupModal: FC<ShowCupModalProps> = ({ isOpen, onClose, bet }) => {  
  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      onRequestClose={onClose}
      transparent
    >
      <View className="flex-1 pt-[5rem] items-center z-50">
        <View className="items-end justify-end w-full px-4 mb-[4.55rem]">
          <MaterialIcons name="close" size={30} color={"#fff"} onPress={onClose} />
        </View>

        <View className="flex items-center justify-center gap-5">
          {/* <Text className="text-white">You got more winnings</Text>
          <Text className="text-white">
            than <Text className="text-secondary-dark">90</Text>% off all users.
          </Text> */}
          <Text className="text-white text-2xl font-semibold">YOU WIN</Text>

          <Text className="text-white text-[2.55rem] font-semibold">
            GHS {formatCurrency((calculateTotalOdds(bet.matches) * bet.stake) + (bet.maxBunus * bet.stake)) }
          </Text>
        </View>

        <Image
          source={require("../../assets/cup/cup.png")}
          resizeMode="contain"
          className="w-full mb-[2rem]"
        />

        <Text className="text-white font-medium">
          From Real Sport / Ticket ID {bet.ticketId}
        </Text>

        <View className="w-full px-4 h-[3rem] flex-row items-center justify-center gap-2 mt-5">
          <View className="items-center justify-center h-[3rem] flex-1 border border-secondary">
            <Text className="text-secondary font-semibold text-lg">
              Details
            </Text>
          </View>
          <View className="items-center justify-center h-[3rem] flex-1 border bg-secondary border-secondary">
            <Text className="text-white font-semibold text-lg">Show Off</Text>
          </View>
        </View>
      </View>

      <View className="bg-[#000] w-full h-full opacity-80 z-0 absolute" />
    </Modal>
  );
};

export default ShowCupModal;
