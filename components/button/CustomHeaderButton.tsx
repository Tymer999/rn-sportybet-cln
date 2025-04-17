import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { FC } from "react";

interface CustomHeaderButtonProps {
  containerStyle?: object;
  text?: string;
  backgroundColor?: string;
  textColor?: "text-white" | "text-black" | "text-red-600" | "text-gray-500";
  onPress?: () => void;
}

const CustomHeaderButton: FC<CustomHeaderButtonProps> = ({
  containerStyle,
  text,
  backgroundColor,
  onPress,
  textColor
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => console.log("Button Pressed")}>
      <View
        // onPress={() => console.log("Button Pressed")}
        className={`border border-white px-[.5rem] py-[.4rem] ${backgroundColor} rounded-sm`}
      >
        <Text className={`${textColor} text-[1rem] font-medium`}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomHeaderButton;
