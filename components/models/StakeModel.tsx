import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TextInput } from 'react-native'
import React, { FC, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface CustomSingleInputModelProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit?: (value: string) => void;
  type: 'stake' | 'ticketId' | 'dateTime' | 'bookingCode';
  initialValue?: string;
}

const CustomSingleInputModel: FC<CustomSingleInputModelProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  type,
  initialValue
}) => {
  const [value, setValue] = useState<string>(initialValue || "");

  const getTitle = () => {
    switch(type) {
      case 'stake':
        return 'Update Stake';
      case 'ticketId':
        return 'Update Ticket ID';
      case 'dateTime':
        return 'Update Date/Time';
      case 'bookingCode':
        return 'Update Rooking Code';
      default:
        return 'Update';
    }
  }

  const getKeyboardType = () => {
    switch(type) {
      case 'stake':
        return 'numeric';
      case 'ticketId':
        return 'numeric';
      case 'dateTime':
        return 'default';
      case 'bookingCode':
        return 'default';
      default:
        return 'default';
    }
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
    setValue("");
    onRequestClose();
  }

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
                  <Text className="text-lg font-bold">{getTitle()}</Text>
                </View>

                <TextInput
                  className="border border-gray-300 rounded-2xl p-4 mb-3 mr-[1px]"
                  placeholder={`Enter ${type}`}
                  value={value}
                  onChangeText={setValue}
                  placeholderTextColor={"#BDC0C7"}
                  keyboardType={getKeyboardType()}
                />

                <View className="flex-row w-full gap-2">
                  <TouchableOpacity
                    className="bg-secondary p-4 rounded-2xl flex-1"
                    onPress={handleSubmit}
                  >
                    <Text className="text-white font-bold text-center">
                      Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default CustomSingleInputModel