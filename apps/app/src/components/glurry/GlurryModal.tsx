import { Feather } from "@expo/vector-icons";
import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	View,
	useColorScheme,
} from "react-native";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeOut,
	FadeOutDown,
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../Themed";
import { AnimateInBlur } from "./AnimateInBlur";
import { Glur } from "./Glur";

export function GlurryModal({
	onClose,
	addresses,
}: {
	onClose: () => void;
	addresses: {
		userId: string;
		id: string;
		email: string;
	}[];
}) {
	const { bottom } = useSafeAreaInsets();
	const ref = React.useRef<{ animateToZero: () => void }>(null);
	const theme = useColorScheme();

	const close = () => {
		ref.current?.animateToZero().then(onClose);
	};

	return (
		<Modal
			animationType="none"
			transparent
			presentationStyle="overFullScreen"
			visible
			onRequestClose={close}
		>
			<Animated.View style={{ flex: 1 }} exiting={FadeOut.duration(100)}>
				<AnimateInBlur
					style={StyleSheet.absoluteFill}
					intensity={70}
					ref={ref}
					tint={
						process.env.EXPO_OS === "web"
							? theme === "light"
								? "systemThinMaterialLight"
								: "systemThickMaterialDark"
							: "systemThinMaterial"
					}
				/>

				{process.env.EXPO_OS !== "web" && (
					<Animated.View entering={FadeIn} exiting={FadeOutDown.duration(100)}>
						<Glur direction="bottom" />
					</Animated.View>
				)}

				<View
					style={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{addresses.map((address) => (
						<Pressable
						key={address.id}>
							<Text
								style={{ color: "#555", fontSize: 24, fontWeight: "600" }}
							>
								{address.email}
							</Text>
						</Pressable>
					))}
				</View>

				<View
					style={{
						position: "absolute",
						bottom: bottom || 16,
						left: 0,
						right: 0,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Animated.View
						entering={FadeInDown}
						exiting={FadeOutDown.duration(100)}
					>
						<Pressable
							hitSlop={16}
							onPress={close}
							style={{
								backgroundColor: "#fff",
								borderRadius: 16,
								padding: 16,
							}}
						>
							<Feather name="x" size={24} color="#000" />
							{/* Schließen-Symbol oder Text */}
						</Pressable>
					</Animated.View>
				</View>
			</Animated.View>
		</Modal>
	);
}
