import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Rect } from "react-native-svg";

export default function DashedRoundedBox({
	children,
	width,
	height,
}: { children: React.ReactNode; width: number; height: number }) {
	return (
		<View
			style={{
				width,
				height,
				justifyContent: "center",
				alignItems: "center",
				position: "relative",
			}}
		>
			<Svg height="100" width="300" style={StyleSheet.absoluteFill}>
				<Rect
					x="2"
					y="2"
					rx="20"
					ry="20"
					width={width - 4}
					height={height - 4}
					stroke="#D1D5DB"
					strokeWidth="2"
					strokeDasharray="10,6"
					strokeLinecap="round"
					fill="none"
				/>
			</Svg>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	text: {
		fontSize: 18,
		fontWeight: "500",
	},
});
