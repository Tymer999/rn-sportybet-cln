import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { FC } from "react";
import { useAuth } from "@/context/AuthContext";

interface CustomHeaderButtonProps {
  containerStyle?: object;
  text?: string;
  backgroundColor?: string;
  showAvatar?: boolean;
  textColor?: "text-white" | "text-black" | "text-red-600" | "text-gray-500";
  onPress?: () => void;
}

const profileImages = {
   "3.png": require("../../assets/profile_pic_images/3.png"),
 "7.png": require("../../assets/profile_pic_images/7.png"),
 "5.png": require("../../assets/profile_pic_images/5.png"),
 "10.png": require("../../assets/profile_pic_images/10.png"),
 "4.png": require("../../assets/profile_pic_images/4.png"),
 "12.png": require("../../assets/profile_pic_images/12.png"),
 "13.png": require("../../assets/profile_pic_images/13.png"),
 "14.png": require("../../assets/profile_pic_images/14.png"),
  // Add all your profile images here
};

const CustomHeaderButton: FC<CustomHeaderButtonProps> = ({
  showAvatar,
  text,
  backgroundColor,
  onPress,
  textColor,
}) => {
  const { user, userProfile } = useAuth();

  const getProfileImage = () => {
    const imageName = userProfile?.profilePicture;
    return profileImages[imageName as keyof typeof profileImages];
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        className={`border border-white  ${
          showAvatar ? "py-[.25rem] px-[.3rem]" : "py-[.4rem] px-[.5rem]"
        } ${backgroundColor} rounded-sm flex-row items-center gap-1 justify-center`}
      >
        {showAvatar && (
          <View className="w-5 h-5 rounded-full overflow-hidden border-[1px] border-white">
            <Image
              source={getProfileImage()}
              resizeMode="contain"
              className="w-5 h-5 rounded-full"
            />
          </View>
        )}
        <Text
          className={`${textColor} ${
            showAvatar ? "text-[.85rem]" : "text-[1rem]"
          } font-medium`}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomHeaderButton;
