import { Text, View } from "@/src/components/Themed";
import { GlurryModal } from "@/src/components/glurry/GlurryModal";
import Item from "@/src/components/mail/item";
import DashedRoundedBox from "@/src/components/ui/dashed-box";
import { authClient } from "@/src/lib/auth-client";
import * as Haptics from "expo-haptics";
import { Link, Redirect, useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

export default function Mails() {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	useEffect(() => {
		if (!session) {
			router.replace("/auth/login");
		}
	}, [session, router.replace]);
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<View
				style={{
					marginTop: 20,
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{modalVisible && <GlurryModal onClose={() => setModalVisible(false)} />}
				<Pressable
					onPress={() => {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
						setModalVisible(true);
					}}
					hitSlop={10}
				>
					<DashedRoundedBox width={250} height={50}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "500",
								color: "#555555",
							}}
						>
							yh679j@trash.company
						</Text>
					</DashedRoundedBox>
				</Pressable>
			</View>
			<View style={{ alignItems: "center", marginTop: 20 }}>
				<Item
					id="1"
					text="Please verify your email address to continue to your account."
					image="https://www.redditstatic.com/emaildigest/reddit-logo.svg"
					company="Reddit"
				/>
				<Item
					id="2"
					text="Please verify your email address to continue to your account."
					image="https://www.redditstatic.com/emaildigest/reddit-logo.svg"
					company="Reddit"
				/>
				<Item
					id="4"
					text="Please verify your email address to continue to your account."
					image="https://www.redditstatic.com/emaildigest/reddit-logo.svg"
					company="Reddit"
				/>
			</View>
			<Link href="/(tabs)/addresses/create">Create a new address</Link>
		</View>
	);
}
