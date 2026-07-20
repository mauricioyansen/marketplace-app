import { Tabs } from "expo-router";
import { colors } from "../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 88 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom + 6,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Products",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="storefront-outline" size={25} />
          ),
          tabBarLabelStyle: { fontSize: 14, marginTop: 4 },
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="clipboard-outline" size={25} />
          ),
          tabBarLabelStyle: { fontSize: 14, marginTop: 4 },
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarActiveTintColor: colors["purple-base"],
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="cart-outline" size={25} />
          ),
          tabBarLabelStyle: { fontSize: 14, marginTop: 4 },
        }}
      />
    </Tabs>
  );
}
