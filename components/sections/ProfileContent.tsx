import { View, Text, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const tabList: {
  name: string;
  icon: "currency-exchange" | "redeem";
  id: number;
}[] = [
  {
    name: "Sporty Bet History",
    icon: "currency-exchange",
    id: 1,
  },
  {
    name: "Transaction",
    icon: "currency-exchange",
    id: 2,
  },
  {
    name: "Gift (0)",
    icon: "redeem",
    id: 3,
  },
];

const helpTabs: {
  name: string;
  icon: "redeem" | "arrow-forward-ios";
  id: number;
  component?: React.ReactNode;
}[] = [
  {
    name: "Sporty Loyalty",
    icon: "redeem",
    id: 1,
  },
  {
    name: "24/7 Customer Sevice",
    icon: "arrow-forward-ios",
    id: 2,
    component: (
      <Text className="text-secondary-dark text-lg">
        Online
      </Text>
    ),
  },
  {
    name: "Notfication Center",
    icon: "arrow-forward-ios",
    id: 3,
  },
  {
    name: "Rate Our App",
    icon: "arrow-forward-ios",
    id: 4,
  },
  {
    name: "Send Feedback",
    icon: "arrow-forward-ios",
    id: 5,
  },
  {
    name: "How to Play",
    icon: "arrow-forward-ios",
    id: 6,
  },
  {
    name: "Update App",
    icon: "arrow-forward-ios",
    id: 7,
    component: (
      <Text className="bg-primary text-white font-medium text-sm px-1 py-[1px] rounded-full">
        available
      </Text>
    )
  },
];

const ProfileContent = () => {
  const tabElements = tabList.map((tab, index) => (
    <View
      className="flex items-center justify-center gap-2 flex-1 h-[4.55rem]"
      key={tab.id}
    >
      {/* <Image source={require("../../assets/icons/")} /> */}
      <MaterialIcons
        name={tab.icon}
        size={20}
        color={"#353A45"}
        className="h-[30%] font-bold"
      />
      <View className="h-[50%] items-center justify-center">
        <Text className="text-black max-w-[8rem] text-center">{tab.name}</Text>
      </View>
    </View>
  ));

  const helpTabElements = helpTabs.map((tab, index) => (
    <View className="flex-row items-center justify-between py-4 border-t-[.3px] border-t-gray-light" key={tab.id}>
      <View className="flex-row gap-3 items-center">
        <MaterialIcons name="redeem" size={20} color={""} />

        <Text className="text-black text-lg">{tab.name}</Text>
      </View>

      <View className="flex-row gap-2 items-center">
        {tab.component && tab.component}
        <MaterialIcons name="arrow-forward-ios" size={13} color={""} />
      </View>
    </View>
  ));


  return (
    <View className="bg-background-light">
      <View className="flex flex-row justify-between items-center py-3">
        {tabElements}
      </View>

      <View className="px-4">{helpTabElements}</View>
    </View>
  );
};

export default ProfileContent;
