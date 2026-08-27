import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
// @ts-ignore: side-effect CSS import without type declarations
import "../styles/global.css";
import { AppModal } from "../shared/components/AppModal";
import { AppBottomSheet } from "../shared/components/AppBottomSheet";
import ToastManager from "toastify-react-native";
import { useUserStore } from "../shared/store/user-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { token } = useUserStore();

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(public)" />
            <Stack.Screen name="(private)" />
          </Stack>
          <AppModal />
          <AppBottomSheet />
          <ToastManager useModal={false} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
