import { Text } from "@/src/components/Themed";
import Input from "@/src/components/ui/input";
import { Link, Redirect, useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { z } from "zod";
import { authClient } from "../../lib/auth-client";

export default function Login() {
	const router = useRouter()
	const { data: session } = authClient.useSession();
	useFocusEffect(() => {
		if (session) {
			router.replace("/");
		}
	});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | undefined>();

	const handleRegister = async () => {
		setError(undefined);
		const schema = z.object({
			email: z.string().email({ message: "Invalid email address" }),
			password: z
				.string()
				.min(8, { message: "Password must be at least 8 characters" })
				.max(50, { message: "Password must be at most 50 characters" }),
		});

		const parse = await schema.safeParseAsync({
			email,
			password,
		});

		if (!parse.success) {
			setError(parse.error.errors[0].message);
			return;
		}

		setError(undefined);

		const signIn = await authClient.signIn.email({
			email,
			password,
		});

		if (signIn.error) {
			setError(`Error: ${signIn.error.message}`);
			return;
		}

		return router.replace("/")
	};

	return (
		<View style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
			<View style={{ marginBottom: 20 }} />
			<Input
				keyboardType="email-address"
				type="email"
				placeholder="Email"
				value={email}
				label="Email"
				onChangeText={setEmail}
			/>
			<Input
				type="password"
				label="Password"
				placeholder="Enter your password"
				onChangeText={setPassword}
			/>
			{error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
			<View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
				<Button title="Login" onPress={handleRegister} />
				<Link href="/auth/register">
					<Text style={{ color: "#555", textDecorationLine: "underline"}}>Register</Text>
				</Link>
			</View>
		</View>
	);
}
