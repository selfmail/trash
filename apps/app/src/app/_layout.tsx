import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import React from "react";
import { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

export const queryClient = new QueryClient();

function RootLayoutNav() {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<SafeAreaView style={{ backgroundColor: "white" }} />
				<PostHogProvider
					apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
					options={{
						host: "https://eu.i.posthog.com",
					}}
				>
					<ThemeProvider value={DefaultTheme}>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						</Stack>
					</ThemeProvider>
				</PostHogProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
