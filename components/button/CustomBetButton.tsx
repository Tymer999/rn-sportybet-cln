import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { FC } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface CustomBetButtonProps {
  backgroundColor?: "#22252e" | "#daeadd",
  textColor?: "#32CE62" | "#0D9737",
text?: string;
}

const CustomBetButton: FC<CustomBetButtonProps> = ({backgroundColor, textColor, text}) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <TouchableWithoutFeedback className="flex-1" onPress={() => setSelected(!selected)}>
      <View className={`flex-1 justify-center items-center px-2 py-1 rounded-sm overflow-hidden h-[2.45rem] ${selected && "bg-secondary-dark"}`} style={{backgroundColor: selected ? "#0D9737" : backgroundColor}}>

        {text === "" ? <Image source={require("../../assets/icons/lock.png")} resizeMode="stretch" className="w-4 h-5" tintColor={"#4f535c"} /> : <Text className="text-secondary-dark font-bold" style={{color: selected ? "#fff" : textColor}}>{text ?? "2.55"}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomBetButton;
