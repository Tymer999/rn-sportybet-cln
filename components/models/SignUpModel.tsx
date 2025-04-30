import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { FC, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserProfile } from "@/services/FirestoreService";

interface SignUpModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModel: FC<SignUpModelProps> = ({ isOpen, onClose }) => {
  const screenHeight = Dimensions.get("window").height;
  const [email, setEmail] = useState("200664766@gmail.com");
  const [password, setPassword] = useState("Tymer123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create user profile in Firestore
      await createUserProfile(
        userCredential.user.uid,
        email,
        "200664766",
        2000 // initial balance,
        
      );

      console.log("User created:", userCredential.user);
      onClose();
    } catch (error: any) {
      setError(error.message);
      console.error("Signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <View
              className="bg-white w-full rounded-t-[3rem] px-6 pt-[5rem]"
              style={{ height: screenHeight }}
            >
              <View className="flex justify-center w-full items-end">
                <MaterialIcons
                  name="close"
                  size={30}
                  color={"#BDC0C7"}
                  onPress={onClose}
                />
              </View>
              {/* <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" /> */}
              <View className="flex-row gap-2 items-center mb-4">
                <MaterialIcons name="add-circle" size={30} color={"#0D9737"} />
                <Text className="text-lg font-bold">Update</Text>
              </View>

              <TextInput
                className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                placeholder="balance"
                placeholderTextColor={"#BDC0C7"}
                keyboardType="numeric"
              />
              <TextInput
                className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                placeholder="username"
                placeholderTextColor={"#BDC0C7"}
                keyboardType="default"
              />

              <View className="flex-row w-full gap-2">
                <TouchableOpacity
                  className="bg-secondary p-4 rounded-2xl flex-1"
                  onPress={handleSignUp}
                >
                  <Text className="text-white font-bold text-center">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SignUpModel;
