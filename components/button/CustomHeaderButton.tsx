import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { FC } from "react";

interface CustomHeaderButtonProps {
  containerStyle?: object;
  text?: string;
  backgroundColor?: string;
  showAvatar?: boolean;
  textColor?: "text-white" | "text-black" | "text-red-600" | "text-gray-500";
  onPress?: () => void;
}

const CustomHeaderButton: FC<CustomHeaderButtonProps> = ({
  containerStyle,
  showAvatar,
  text,
  backgroundColor,
  onPress,
  textColor
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        className={`border border-white  ${showAvatar ? "py-[.25rem] px-[.3rem]" : "py-[.4rem] px-[.5rem]"} ${backgroundColor} rounded-sm flex-row items-center gap-1 justify-center`}
      >
        {
          showAvatar && <View className="w-5 h-5 rounded-full overflow-hidden border-[1px] border-white">
            <Image
              source={require("../../assets/profile_pic_images/7.png")}
              resizeMode="contain"
              className="w-5 h-5 rounded-full"
            />
          </View>
        }
        <Text className={`${textColor} ${showAvatar ? "text-[.85rem]" : "text-[1rem]"} font-medium`} numberOfLines={1}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomHeaderButton;
