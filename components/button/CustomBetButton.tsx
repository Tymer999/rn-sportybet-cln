import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { FC } from "react";

interface CustomBetButtonProps {
  backgroundColor?: "#34383c" | "#daeadd",
  textColor?: "#32CE62" | "#0D9737",

}

const CustomBetButton: FC<CustomBetButtonProps> = ({backgroundColor, textColor}) => {
  return (
    <TouchableWithoutFeedback className="flex-1">
      <View className={`flex-1 justify-center items-center px-2 py-1 rounded-xs overflow-hidden h-[2.35rem] ${""}`} style={{backgroundColor: backgroundColor}}>
        <Text className="text-secondary-dark font-bold" style={{color: textColor}}>2.55</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomBetButton;
