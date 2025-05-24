import { Text, View } from "@/src/components/Themed";
import {
	ItemListBottomItem,
	ItemListItem,
	ItemListTopItem,
} from "@/src/components/settings/items";
import { authClient } from "@/src/lib/auth-client";
import { Redirect, useFocusEffect, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";

export default function SettinsPage() {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	useEffect(() => {
		if (!session) {
			router.replace("/auth/login");
		}
	}, [session, router.replace]);
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
					flex: 1,
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
					<Text style={{ fontSize: 22, fontWeight: "500", color: "#555555" }}>
						Settings
					</Text>
				</View>
				<View
					style={{
						marginTop: 20,
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<ItemListTopItem icon="settings" text="General" />
					<ItemListItem icon="list" text="Privacy" />
					<Pressable
						onPress={() => {
							authClient.signOut();
							return router.replace("/auth/login")
						}}
						style={{ width: "80%" }}
					>
						<ItemListBottomItem icon="arrow-right-circle" text="Sign Out" />
					</Pressable>
				</View>
			</View>
		</View>
	);
}
