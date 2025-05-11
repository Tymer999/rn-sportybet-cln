import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import React, { FC } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { formatDateTime } from "@/constants/FormatDateTime";
import { updateUserCurrency } from "@/services/FirestoreService";

interface SettingsItemProp {
  title: string;
  value: string;
}

const SettingsScreen = () => {
  const { userProfile, user } = useAuth();

  const calculateDaysRemaining = (firestoreTimestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    // Convert Firestore timestamp to JavaScript Date
    const expiryDate = new Date(firestoreTimestamp.seconds * 1000);
    const currentDate = new Date();

    // Calculate difference in milliseconds
    const diffTime = Math.abs(expiryDate.getTime() - currentDate.getTime());
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Format expiry date
    const formattedDate = expiryDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return {
      expiryDate: formattedDate,
      daysRemaining,
      isExpired: currentDate > expiryDate,
    };
  };

  const subscriptionDetails = userProfile?.endDateOfSubscription
    ? calculateDaysRemaining(userProfile.endDateOfSubscription)
    : null;

  const SettingsItem: FC<SettingsItemProp> = ({ title, value }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray">
      <Text className="text-lg text-black">{title}</Text>
      <Text className="text-lg text-gray">{value}</Text>
    </View>
  );
  return (
    <View className="flex-1 bg-background-light">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerBackTitle: "Me",
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: "#e51827",
          },
        }}
      />

      <ScrollView className="px-6 py-4">
        <SettingsItem title="Username" value={userProfile?.username ?? ""} />
        <SettingsItem title="Email" value={userProfile?.email ?? ""} />
        <SettingsItem
          title="Display Name"
          value={userProfile?.username.toLowerCase() ?? ""}
        />
        <SettingsItem title="Subscription" value={"premium"} />
        <SettingsItem
          title="Expiry"
          value={`${subscriptionDetails?.expiryDate}(${subscriptionDetails?.daysRemaining} days left)`}
        />
        <SettingsItem
          title="Phone number"
          value={userProfile?.phoneNumber ?? ""}
        />

        <View className="gap-2 mt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-lg">Currency</Text>

            <View className="flex-row gap-2">
              <TouchableOpacity
                className={`bg-gray border-[1.55px] ${
                  userProfile?.currency === "GHS"
                    ? "border-black"
                    : "border-gray"
                } rounded-2xl p-2`}
                onPress={() => updateUserCurrency(user?.uid ?? "", "GHS")}
              >
                <Text className="text-black">GHS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-gray border-[1.55px] ${
                  userProfile?.currency === "NGN"
                    ? "border-black"
                    : "border-gray"
                } rounded-2xl p-2`}
                onPress={() => updateUserCurrency(user?.uid ?? "", "NGN")}
              >
                <Text className="text-black">NGN</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-black text-lg">View Mode</Text>
            <Switch />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-lg">Dark Mode</Text>
            <Switch />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-lg">Dark Mode</Text>
            <View className="px-6 py-2 bg-[#410052] rounded-lg">
              <Text className="text-white">Show</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-lg">Devices</Text>
            <View className="px-6 py-2 bg-[#410052] rounded-lg">
              <Text className="text-white">manage</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
