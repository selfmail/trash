import { act, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../Themed";

interface TabBarProps {
	children: React.ReactNode;
	activeIndex: number;
	tabCount: number;
}

export const TabBar = ({ children, activeIndex, tabCount }: TabBarProps) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: activeIndex,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [activeIndex, animatedValue]);

	const STEP_WIDTH = 60;

	const translateX = animatedValue.interpolate({
		inputRange: [0, tabCount - 1],
		outputRange: [0, (tabCount - 1) * STEP_WIDTH],
	});

	return (
		<SafeAreaView
			style={{
				position: "absolute",
				bottom: 0,
				width: "100%",
				display: "flex",
				alignItems: "center",
				flex: 1,
				justifyContent: "center",
			}}
		>
			<View
				style={{
					elevation: 10,
					padding: 8,
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					borderRadius: 20,
					backgroundColor: "#4B4B4B",
					position: "relative",
				}}
			>
				{/* Animierter Hintergrund */}
				{activeIndex === 0 || activeIndex === 1 ? (
						<Animated.View
							style={{
								position: "absolute",
								width: 40,
								height: 40,
								backgroundColor: "#666666",
								borderRadius: 14,
								transform: [{ translateX }],
								left: 8,
								top: 8,
							}}
						/>
					): null}
				{children}
			</View>
		</SafeAreaView>
	);
};
