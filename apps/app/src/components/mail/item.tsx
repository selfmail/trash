import * as Haptic from "expo-haptics";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import { Text, View } from "../Themed";

export default function Item({
	text,
	image,
	company,
}: { text: string; image: string; company: string; id: string }) {
	return (
		<Pressable
			onPress={() => {
				console.log("click");
				Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Soft);
			}}
		>
			<View
				style={{
					backgroundColor: "#eeeeee",
					width: "80%",
					padding: 10,
					borderRadius: 10,
					marginTop: 20,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: "transparent",
					}}
				>
					<Image
						style={{
							width: 20,
							height: 20,
						}}
						source={image}
						contentFit="cover"
						transition={1000}
					/>
					<Text
						style={{
							marginLeft: 10,
							backgroundColor: "transparent",
							fontSize: 18,
							fontWeight: "500",
							color: "#222222",
						}}
					>
						{company}
					</Text>
				</View>
				<Text
					style={{
						marginTop: 10,
						fontSize: 18,
						fontWeight: "500",
						color: "#555555",
					}}
				>
					{text}
				</Text>
			</View>
		</Pressable>
	);
}
