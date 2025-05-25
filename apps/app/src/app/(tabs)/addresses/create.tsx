import { Text, View } from "@/src/components/Themed";
import Input from "@/src/components/ui/input";
import { useCreateAddress } from "@/src/hooks/use-create-address";
import { authClient } from "@/src/lib/auth-client";
import * as Haptics from "expo-haptics";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Button } from "react-native";
import { z } from "zod";
import { queryClient } from "../../_layout";

export default function CreateAddressScreen() {
	const { data: session } = authClient.useSession();

	if (!session) {
		return <Redirect href="/auth/login" />;
	}

	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const { mutateAsync: createAddress } = useCreateAddress();

	const handleSubmit = async () => {
		setLoading(true);
		setError(undefined);

		const parse = await z
			.string()
			.email({ message: "Email must be an valid email!" })
			.endsWith("@trash.company", {
				message: "Email must end with @trash.company",
			})
			.safeParseAsync(email);

		if (!parse.success) {
			setError(parse.error.errors[0].message);
			setLoading(false);
			return;
		}

		try {
			await createAddress({
				email: parse.data,
				userId: session.user.id,
			});

			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

			setLoading(false);

			return router.replace("/(tabs)/settings");
		} catch (err) {
			setError("Error while creating address: it's probably already taken");
			
			setLoading(false);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
			}}
		>
			<View
				style={{
					width: "80%",
					marginTop: 20,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
				}}
			>
				<Input placeholder="Email" value={email} onChangeText={setEmail} />
				{error && <Text style={{ color: "red" }}>{error}</Text>}
				{loading ? (
					<Text>Loading...</Text>
				) : (
					<Button title="Submit" onPress={handleSubmit} />
				)}
			</View>
		</View>
	);
}
