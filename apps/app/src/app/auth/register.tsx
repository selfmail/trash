import { Text } from "@/src/components/Themed";
import Input from "@/src/components/ui/input";
import { Link, Redirect, useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { z } from "zod";
import { authClient } from "../../lib/auth-client";

export default function Register() {
	const router = useRouter()
	const { data: session } = authClient.useSession();
	useFocusEffect(() => {
		if (session) {
			router.replace("/");
		}
	});
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | undefined>();

	const handleRegister = async () => {
		setError(undefined);
		const schema = z.object({
			name: z
				.string()
				.min(3, { message: "Name must be at least 3 characters" })
				.max(50, { message: "Name must be at most 50 characters" }),
			email: z.string().email({ message: "Invalid email address" }),
			password: z
				.string()
				.min(8, { message: "Password must be at least 8 characters" })
				.max(50, { message: "Password must be at most 50 characters" }),
		});

		const parse = await schema.safeParseAsync({
			email,
			password,
			name,
		});

		if (!parse.success) {
			setError(parse.error.errors[0].message);
			return;
		}

		setError(undefined);

		const signUp = await authClient.signUp.email({
			email,
			password,
			name,
		});

		if (signUp.error) {
			setError(`Error: ${signUp.error.message}`);
			return;
		}


		return router.replace("/")
	};

	return (
		<View style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
			<View style={{ marginBottom: 20 }} />
			<Input
				label="Name"
				placeholder="Name"
				value={name}
				onChangeText={setName}
			/>
			<Input
				keyboardType="email-address"
				placeholder="Email"
				type="email"
				value={email}
				label="Email"
				onChangeText={setEmail}
			/>
			<Input
				type="password"
				label="Password"
				onChangeText={setPassword}
				placeholder="Enter your password"
			/>
			{error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
			<View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
				<Button title="Register" onPress={handleRegister} />
				<Link href="/auth/login">
					<Text style={{ color: "#555", textDecorationLine: "underline"}}>Login</Text>
				</Link>
			</View>
		</View>
	);
}
