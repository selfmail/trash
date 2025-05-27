import { Text, View } from "@/src/components/Themed";
import { GlurryModal } from "@/src/components/glurry/GlurryModal";
import Item from "@/src/components/mail/item";
import DashedRoundedBox from "@/src/components/ui/dashed-box";
import { useAddresses } from "@/src/hooks/use-addresses";
import { useEmails } from "@/src/hooks/use-emails";
import { authClient } from "@/src/lib/auth-client";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link, Redirect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { queryClient } from "../_layout";

export default function Mails() {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	const [modalVisible, setModalVisible] = useState(false);
	const [currentAddress, setCurrentAddress] = useState<string | undefined>();
	const [currentEmail, setCurrentEmail] = useState<string | undefined>();

	// Only fetch addresses if we have a session
	const {
		data: addresses,
		isLoading: isAddressesLoading,
		error,
	} = useAddresses(session?.user?.id ?? "");

	// Only fetch emails if we have addresses
	const {
		data: emails,
		isLoading: isEmailsLoading,
		error: errorEmails,
		refetch: refetchEmails,
	} = useEmails(currentAddress ?? "", session?.user?.id ?? "");

	useEffect(() => {
		if (currentAddress) {
			refetchEmails();
		}
	}, [currentAddress, refetchEmails]);

	// Early return if no session
	if (!session) {
		return <Redirect href="/auth/login" />;
	}

	if (error) {
		return <Text>Error: {error.message}</Text>;
	}

	if (!addresses && isAddressesLoading) {
		return <Text>Loading...</Text>;
	}
	if (!addresses) {
		console.log("no addresses");
		return <Redirect href="/(tabs)/addresses/create" />;
	}
	if (addresses.length === 0) {
		return <Redirect href="/(tabs)/addresses/create" />;
	}

	if (!currentAddress) {
		setCurrentAddress(addresses[0].id);
		setCurrentEmail(addresses[0].email);
	}

	if (errorEmails) {
		return <Text>Error Emails: {errorEmails.message}</Text>;
	}

	if (!emails && isEmailsLoading) {
		return <Text>Loading...</Text>;
	}


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
				{modalVisible && (
					<GlurryModal
						setCurrentAddress={(id, email) => {
							setCurrentAddress(id);
							setCurrentEmail(email);
						}}
						addresses={addresses || []}
						onClose={() => setModalVisible(false)}
					/>
				)}
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
							{isAddressesLoading ? "Loading..." : currentEmail}
						</Text>
					</DashedRoundedBox>
				</Pressable>
			</View>
			<View style={{ alignItems: "center", marginTop: 20 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						width: "80%",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Pressable
						hitSlop={10}
						onPress={() => {
							router.push("/(tabs)/addresses/create");
						}}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Feather name="plus" size={14} color="#555555" />
							<Text
								style={{
									marginLeft: 5,
									fontSize: 14,
									fontWeight: "500",
									color: "#555555",
								}}
							>
								Create a new address
							</Text>
						</View>
					</Pressable>
					<Pressable
						hitSlop={10}
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
							refetchEmails();
						}}
					>
						<Feather name="refresh-ccw" size={14} color="#555555" />
					</Pressable>
				</View>
				{isEmailsLoading ? (
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							width: "80%",
							alignItems: "center",
							justifyContent: "center",
							marginTop: 20,
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "500",
								color: "#555555",
							}}
						>
							Loading...
						</Text>
					</View>
				) : (
					emails?.map((email) => (
						<Item
							key={email.id}
							id={email.id}
							text={email.body}
							image={email.from}
							company={email.from}
						/>
					))
				)}
				{!emails?.length && (
					<Text style={{ marginTop: 20 }}>No emails found</Text>
				)}
			</View>
		</View>
	);
}
