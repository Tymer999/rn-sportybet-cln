import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/index";
import CustomHeaderButton from "../button/CustomHeaderButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import profileImageList from "../../constants/ProfileImagesList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SignUpModel from "../models/SignUpModel";
import LoginModel from "../models/LoginModel";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/constants/FormatCurrency";
import { updateUserProfile } from "@/services/FirestoreService";

type UserDetails = {
  balance: string;
  username: string;
  phoneNumber: string;
  email: string;
};

const Header = () => {
  const { user, userProfile } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = React.useState(false);
  const [loginModalVisible, setLoginModalVisible] = React.useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<number>(1);
  const [profileImage, setProfileImage] = useState<string>(userProfile?.profilePicture ?? "");
  const [formData, setFormData] = useState<UserDetails>({
    balance: userProfile?.balance.toFixed(2) ?? "0.00",
    username: userProfile?.username ?? "",
    phoneNumber: userProfile?.phoneNumber ?? "",
    email: userProfile?.email ?? "",
  });  

  const handleBalancePress = () => {
    setModalVisible(true);
  };

  const handleProfileUpdate = async () => {
    // Handle profile update logic here
    
    if (!user?.uid) {
      console.error("User ID is undefined");
      return;
    }
    await updateUserProfile(user.uid, {
      balance: parseFloat(formData.balance.replace(/[^0-9.-]+/g, "")),
      username: formData.username,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      profilePicture: profileImage,
    } )

    setModalVisible(false);
  };
  
  const profileImagesElements = profileImageList.map((profile, index) => (
    <TouchableWithoutFeedback
      key={profile.id}
      onPress={() => {
        setSelectedProfileImage(index + 1);
        setProfileImage(profile.profile);
      }}
    >
      <View
        className={`w-[4.55rem] h-[4.55rem] rounded-full overflow-hidden ${
          selectedProfileImage === profile.id &&
          "border-2 border-secondary-dark"
        }`}
      >
        <Image
          source={profile.image}
          resizeMode="contain"
          className="w-[4.55rem] h-[4.55rem] rounded-full"
        />
      </View>
    </TouchableWithoutFeedback>
  ));

  return (
    <>
      <View className="bg-primary w-full h-[3rem] flex flex-row items-center justify-between px-4">
        <Image source={images.logo} className="w-1/4" resizeMode="contain" />

        {user ? (
          <View className="flex-row items-center gap-2">
            <FontAwesome name="search" size={18} color="white" />
            <CustomHeaderButton
              text={userProfile?.currency + " " +  formatCurrency(userProfile?.balance ?? 0)}
              textColor="text-white"
              backgroundColor="bg-transparent"
              showAvatar={user !== null}
              onPress={handleBalancePress}
            />
          </View>
        ) : (
          <View className="flex flex-row items-center gap-[.5rem]">
            <FontAwesome name="search" size={18} color="white" />
            <CustomHeaderButton
              text="Join Now"
              textColor="text-red-600"
              backgroundColor="bg-white"
              onPress={() => setSignUpModalVisible(true)}
            />
            <CustomHeaderButton
              text="Log in"
              textColor="text-white"
              onPress={() => setLoginModalVisible(true)}
            />
          </View>
        )}
      </View>

      <SignUpModel
        isOpen={signUpModalVisible}
        onClose={() => setSignUpModalVisible(false)}
      />

      <LoginModel
        isOpen={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white w-[80%] rounded-[3rem] p-6">
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="flex-row gap-2 items-center mb-4">
                    <MaterialIcons
                      name="add-circle"
                      size={30}
                      color={"#0D9737"}
                    />
                    <Text className="text-lg font-bold">Update</Text>
                  </View>

                  <View className="flex-row flex-wrap gap-3 mb-4 w-full items-center justify-center">
                    {profileImagesElements}
                  </View>

                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="balance"
                    placeholderTextColor={"#BDC0C7"}
                    value={formData.balance}
                    onChangeText={(e) =>
                      setFormData({ ...formData, balance: e })
                    }
                    keyboardType="numeric"
                  />
                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="username"
                    placeholderTextColor={"#BDC0C7"}
                    value={formData.username}
                    onChangeText={(e) =>
                      setFormData({ ...formData, username: e })
                    }
                    keyboardType="default"
                  />
                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Phone number"
                    placeholderTextColor={"#BDC0C7"}
                    value={formData.phoneNumber}
                    onChangeText={(e) =>
                      setFormData({ ...formData, phoneNumber: e })
                    }
                    keyboardType="number-pad"
                  />
                  <TextInput
                    className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                    placeholder="Email"
                    placeholderTextColor={"#BDC0C7"}
                    value={formData.email}
                    onChangeText={(e) => setFormData({ ...formData, email: e })}
                    keyboardType="email-address"
                  />

                  <View className="flex-row w-full gap-2">
                    <TouchableOpacity
                      className="bg-secondary p-4 rounded-2xl flex-1"
                      onPress={handleProfileUpdate}
                    >
                      <Text className="text-white font-bold text-center">
                        Add
                      </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      className="bg-primary p-4 rounded-2xl flex-1"
                      onPress={() => setModalVisible(false)}
                    >
                      <Text className="text-white font-bold text-center">
                        Close
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Header;
