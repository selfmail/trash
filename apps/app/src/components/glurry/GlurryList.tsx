import React from "react";
import { Pressable, View } from "react-native";
import Animated, {
	Easing,
	SlideInDown,
	SlideOutDown,
} from "react-native-reanimated";
import { Text } from "../Themed";
import { GlurryModal } from "./GlurryModal";

export function GlurryList({ setShow }: { setShow: (show: boolean) => void }) {
	return (
		<GlurryModal onClose={() => setShow(false)}>
			<Animated.View
				entering={SlideInDown.duration(500).easing(Easing.out(Easing.exp))}
				exiting={SlideOutDown.easing(Easing.in(Easing.exp))}
				style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<Pressable onPress={() => setShow(false)}>
					<View
						style={{
							padding: 24,
							borderRadius: 16,
							backgroundColor: "rgba(255, 255, 255, 0.9)",
						}}
					>
						<Text>Henri</Text>
					</View>
				</Pressable>
			</Animated.View>
		</GlurryModal>
	);
}
