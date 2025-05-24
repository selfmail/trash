import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Text, View } from "../Themed";
import Item from "../mail/item";

interface BlurModalProps {
	children: React.ReactNode;
}

export const BlurModalItem = ({ children }: BlurModalProps) => {
	return <BlurView style={{ flex: 1 }}>{children}</BlurView>;
};

export const BlurModalList = ({ children }: BlurModalProps) => {
	return <BlurView style={{ flex: 1 }}>{children}</BlurView>;
};

export const BlurModal = ({ children }: BlurModalProps) => {
	return (
		<BlurView
			style={{
				position: "absolute",
				top: 0,
				zIndex: 1000,
				left: 0,
				right: 0,
				bottom: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
			}}
			intensity={12}
		>
			<Text>Hey</Text>
			{children}
		</BlurView>
	);
};

interface AnimatedBlurModalProps {
	visible: boolean;
	onClose: () => void;
}

export const AnimatedBlurModal: React.FC<AnimatedBlurModalProps> = ({ visible, onClose }) => {
	const opacity = useSharedValue(0);

	React.useEffect(() => {
		opacity.value = visible ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 200 });
	}, [visible, opacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		// pointerEvents is not a style prop, so we handle it on the component
	}));

	if (!visible && opacity.value === 0) return null;

	return (
		<Animated.View
			style={[
				StyleSheet.absoluteFillObject,
				{
					zIndex: 9999,
					justifyContent: "center",
					alignItems: "center",
				},
				animatedStyle,
			]}
			pointerEvents={visible ? "auto" : "none"}
		>
			<BlurView
				intensity={20}
				style={StyleSheet.absoluteFillObject}
			/>
			<View
				style={{
					width: 320,
					backgroundColor: "rgba(255,255,255,0.85)",
					borderRadius: 18,
					padding: 20,
					alignItems: "center",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.2,
					shadowRadius: 8,
				}}
			>
				<Pressable
					onPress={onClose}
					style={{
						position: "absolute",
						top: 10,
						right: 10,
						padding: 8,
						zIndex: 10,
					}}
				>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>×</Text>
				</Pressable>
				<Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 16 }}>Test Emails</Text>
				<View style={{ width: "100%", alignItems: "center" }}>
					<Item
						id="1"
						text="Please verify your email address to continue to your account."
						image="https://www.redditstatic.com/emaildigest/reddit-logo.svg"
						company="Reddit"
					/>
					<Item
						id="2"
						text="Welcome to Trash Company! Your account is ready."
						image="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
						company="Microsoft"
					/>
					<Item
						id="3"
						text="Your subscription has been renewed."
						image="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png"
						company="Apple"
					/>
				</View>
			</View>
		</Animated.View>
	);
};
