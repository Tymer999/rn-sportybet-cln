import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import BookBetModel from "../models/BookBetModel";

const SelectedBetQuantityButton = () => {
  const [modelVisible, setModalVisible] = useState(true)
  {
    /* Fixed Container */
  }

  return (
    <>
    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
      <View
        style={{
          position: "absolute",
          bottom: 90,
          right: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Added semi-transparent white background
        }}
        className="w-[3.55rem] aspect-square rounded-[.25rem] items-center justify-center"
      >
        <Text className="text-white font-medium p-1 bg-primary w-7 h-7 text-center rounded-full my-1">
          0
        </Text>
        <Text className="text-black text-xs text-nowrap font-bold">
          BETSLIP
        </Text>
      </View>
    </TouchableWithoutFeedback>

    <BookBetModel isOpen={modelVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default SelectedBetQuantityButton;
