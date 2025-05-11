import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabsList } from "@/constants/TabsList";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  const TabsElements = TabsList.map((tab) => {
    return (
        <Tabs.Screen
          key={tab.name}
          name={tab.id}
          options={{
            title: tab.name,
            tabBarIcon: ({
              focused,
            }: {
              focused: boolean;
              color: string;
            }) => (
              <Image
                source={tab.icon}
                style={{ width: 25, height: 25 }}
                tintColor={focused ? "white" : ""}
              />
            ),
          }}
        />
    );
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "black",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          default: {
            position: "absolute",
            backgroundColor: "black",
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: "transparent",
          },
        }),
      }}
    >
      {TabsElements}
    </Tabs>
  );
}
