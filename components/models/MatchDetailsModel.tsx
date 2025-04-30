import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import React, { FC } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SelectList } from "react-native-dropdown-select-list";
import { useAuth } from "@/context/AuthContext";
import { updateMatch } from "@/services/FirestoreService";

interface MatchDetailsModelProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit?: (value: string) => void;
  matchDetails?: {
    odds: number;
    pick: string;
    outcome: string;
    market: string;
    ftScore: string;
    status: string;
    gameId: string;
  };
  betId: string;
}

const statusTabsList = [
  {
    name: "Won",
    status: "won",
    id: 1,
  },
  {
    name: "Lost",
    status: "lost",
    id: 2,
  },
  {
    name: "Void",
    status: "void",
    id: 3,
  },
  {
    name: "Not Started",
    status: "notStart",
    id: 4,
  },
];

// Update marketOptions format for SelectList
const marketOptions = [
  { key: "1X2", value: "1X2" },
  { key: "Correct Score", value: "Correct Score" },
  { key: "Over/Under", value: "Over/Under" },
  { key: "Both Teams to Score", value: "BTTS" },
  { key: "Double Chance", value: "Double Chance" },
];

const MatchDetailsModel: FC<MatchDetailsModelProps> = ({
  isOpen,
  onRequestClose,
  matchDetails,
  betId
}) => {
  const [formData, setFormData] = React.useState({
    odds: matchDetails?.odds.toString() || "",
    pick: matchDetails?.pick || "",
    outcome: matchDetails?.outcome || "",
    market: matchDetails?.market || "over",
    ftScore: matchDetails?.ftScore || "",
    matchStatus: matchDetails?.status || ""
  });
  const {user} = useAuth();

  const statusTabElements = statusTabsList.map((tab) => {
    return (
      <TouchableOpacity
        key={tab.id}
        className={`rounded-full px-4 py-3 ${
          formData.matchStatus === tab.status ? "bg-[#000]" : ""
        }`}
        onPress={() => setFormData({...formData, matchStatus: tab.status})}
      >
        <Text
          className={`text-gray-700 font-bold ${
            formData.matchStatus === tab.status ? "text-white" : ""
          }`}
        >
          {tab.name}
        </Text>
      </TouchableOpacity>
    );
  });


  const handleUpdate = async () => {
    try {
      if (!user || !matchDetails?.gameId) return;

      const updates = {
        odds: parseFloat(formData.odds),
        pick: formData.pick,
        outcome: formData.outcome,
        market: formData.market,
        ftScore: formData.ftScore,
        matchStatus: formData.matchStatus
      };

      await updateMatch(user.uid, betId, matchDetails.gameId, updates);
      onRequestClose();
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-[75%] rounded-[3rem] p-6">
              <View>
                <View className="flex-row gap-2 items-center mb-4">
                  <MaterialIcons
                    name="add-circle"
                    size={30}
                    color={"#0D9737"}
                  />
                  <Text className="text-lg font-bold">Add Code</Text>

                  <TouchableOpacity
                    className="bg-[#000] px-4 py-3 rounded-2xl"
                    onPress={handleUpdate}
                  >
                    <Text className="text-white font-bold text-center">
                      Update
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Replace the existing Picker with this: */}
                <SelectList
                  setSelected={(val: string) =>
                    setFormData({ ...formData, market: val })
                  }
                  data={marketOptions}
                  save="value"
                  defaultOption={{ key: "1X2", value: matchDetails?.market }}
                  search={false}
                  boxStyles={{
                    borderRadius: 16,
                    borderColor: "#E5E7EB",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                  inputStyles={{
                    color: "#000",
                    fontSize: 16,
                  }}
                  dropdownStyles={{
                    borderColor: "#E5E7EB",
                  }}
                  dropdownItemStyles={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                  }}
                  dropdownTextStyles={{
                    color: "#000",
                    fontSize: 16,
                  }}
                />

                <TextInput
                  className="border border-gray-300 rounded-2xl p-4 mb-3 mt-3 mr-[1px]"
                  placeholder="Value"
                  onChangeText={(e) => setFormData({ ...formData, odds: e })}
                  numberOfLines={1}
                  value={formData.odds}
                  placeholderTextColor={"#BDC0C7"}
                  keyboardType="numeric"
                />

                <TextInput
                  className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                  placeholder="Value"
                  numberOfLines={1}
                  value={
                    formData.matchStatus === "notStart" ? formData.pick : formData.ftScore
                  }
                  onChangeText={(e) =>
                    formData.matchStatus === "notStart"
                      ? setFormData({ ...formData, pick: e })
                      : setFormData({ ...formData, ftScore: e })
                  }
                  placeholderTextColor={"#BDC0C7"}
                  keyboardType="default"
                />

                {formData.matchStatus !== "notStart" && (
                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Value"
                    onChangeText={(e) =>
                      setFormData({ ...formData, outcome: e })
                    }
                    value={formData.outcome}
                    numberOfLines={1}
                    placeholderTextColor={"#BDC0C7"}
                    keyboardType="default"
                  />
                )}

                <View className="flex-row items-center">
                  {statusTabElements}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MatchDetailsModel;
