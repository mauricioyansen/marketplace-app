import { View, Text, TouchableOpacity } from "react-native";
import { SelectionOption } from "../../../hooks/useAppModal";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

export interface SelectionModalProps {
  title: string;
  message?: string;
  options: SelectionOption[];
}

export const SelectionModal: FC<SelectionModalProps> = ({
  options,
  title,
  message,
}) => {
  return (
    <View className="bg-white rounded-xl shadow-2xl w-[85%] mx-auto max-w-sm p-6">
      <Text>{title}</Text>

      {message && <Text>{message}</Text>}

      <View>
        {options.map((opt) => (
          <TouchableOpacity
            onPress={opt.onPress}
            className="w-full py-3 px-4 rounded-lg items-center flex-row justify-center mb-2"
          >
            {opt.icon && <Ionicons name={opt.icon} size={20}></Ionicons>}
            <Text>{opt.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
