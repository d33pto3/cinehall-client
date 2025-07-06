import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
      </Stack>
    </QueryClientProvider>
  );
}
