import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { FC, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth } from "../../firebaseConfig";

// Ensure `auth` is explicitly typed in your firebaseConfig file
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModel: FC<LoginModelProps> = ({ isOpen, onClose }) => {
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
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
              className="bg-white w-full rounded-t-[3rem] px-4 pt-[5rem]"
              style={{ height: screenHeight }}
            >
              <View className="flex justify-center w-full items-end mb-6">
                <MaterialIcons
                  name="close"
                  size={30}
                  color={"#BDC0C7"}
                  onPress={onClose}
                />
              </View>
              {/* <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" /> */}

              <View className="px-4">
                <View className="flex-row gap-2 items-center mb-4">
                  <Image
                    source={require("../../assets/logos/gh.png")}
                    resizeMode="contain"
                    className="w-6"
                    style={{ transform: [{ skewX: "-10deg" }] }}
                  />

                  <Text className="text-black text-lg">Ghana</Text>
                  <Text className="text-secondary-dark ml-4 text-lg">
                    Change
                  </Text>

                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={"#0D9737"}
                  />
                </View>

                <View
                  className={`flex-row items-center border rounded-sm mb-5 mr-[1px] h-[3.35rem] ${
                    isPhoneFocused ? "border-[#32CE62]" : "border-gray-300"
                  }`}
                >
                  <Text className="pl-4 text-gray text-lg">+233</Text>
                  <TextInput
                    className="flex-1 p-4 text-lg"
                    placeholder="Mobile Number"
                    placeholderTextColor={"#BDC0C7"}
                    value={phoneNumber}
                    onChangeText={(e) => {
                      setPhoneNumber(e);
                      setEmail(e + "@gmail.com");
                    }}
                    keyboardType="numeric"
                    onFocus={() => setIsPhoneFocused(true)}
                    onBlur={() => setIsPhoneFocused(false)}
                  />
                </View>
                <TextInput
                  className={`border rounded-sm text-lg p-2 h-[3.35rem] pl-8 mb-5 mr-[1px] ${
                    isPasswordFocused ? "border-[#32CE62]" : "border-gray-300"
                  }`}
                  placeholder="Password"
                  placeholderTextColor={"#BDC0C7"}
                  keyboardType="default"
                  value={password}
                  onChangeText={(e) => setPassword(e)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />

                <View className="flex-row w-full gap-2 h-[3.35rem]">
                  <TouchableOpacity
                    className="bg-gray-light p-4 rounded-sm flex-1"
                    onPress={handleLogin}
                  >
                    <Text className="text-gray text-lg text-center">Login</Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row  items-center justify-between mt-9">
                  <Text className="text-secondary-dark font-normal">
                    Forgot Password?
                  </Text>
                  <Text className="text-secondary-dark font-normal">
                    Create New Account
                  </Text>
                </View>

                <View className="flex-row mt-6 items-center gap-2">
                  <View className="flex-1 w-full h-[.7px] bg-gray opacity-40" />
                  <Text className="text-xl text-gray">Or</Text>
                  <View className="flex-1 w-full h-[.7px] bg-gray opacity-40" />
                </View>

                <View className="flex-row mt-6 items-center gap-1 justify-center">
                  <Text className="text-gray text-[15px]">
                    To deactivate or reactivate your account
                  </Text>
                  <Text className="text-secondary-dark text-[15px]">
                    click here.
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LoginModel;
