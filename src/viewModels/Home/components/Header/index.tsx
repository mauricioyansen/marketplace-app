import { Image, TouchableOpacity, View, Text } from "react-native";
import { useUserStore } from "../../../../shared/store/user-store";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { normalizeImageUrl } from "../../../../shared/utils/normalizeImageUrl";

export const HomeHeader = () => {
  const { user } = useUserStore();

  return (
    <View>
      <TouchableOpacity className="flex-row items-center gap-6">
        <View className="relative">
          {user?.avatarUrl ? (
            <Image
              source={normalizeImageUrl(user.avatarUrl)}
              className="size-[56px] rounded-xl border-shape"
            />
          ) : (
            <View className="size-[56px] rounded-xl bg-shape border-2 items-center justify-center border-gray-200">
              <Ionicons name="person" size={24} color={colors.gray["300"]} />
            </View>
          )}
        </View>

        <View>
          <Text className="font-bold text-base">
            Hello, {user?.name.split(" ")[0] || "User"}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="color-purple-base font-bold">See profile</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={colors["purple-base"]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
