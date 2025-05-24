import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	type TextInputProps,
	TouchableOpacity,
	View,
} from "react-native";

interface InputProps extends TextInputProps {
	label?: string;
	error?: string;
	type?: "text" | "email" | "password";
	containerStyle?: object;
}

export default function Input({
	label,
	error,
	type = "text",
	containerStyle,
	...props
}: InputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const getKeyboardType = () => {
		switch (type) {
			case "email":
				return "email-address";
			case "password":
				return "default";
			default:
				return "default";
		}
	};

	const getAutoCapitalize = () => {
		switch (type) {
			case "email":
				return "none";
			default:
				return "sentences";
		}
	};

	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={[styles.inputContainer, error && styles.inputError]}>
				<TextInput
					style={styles.input}
					keyboardType={getKeyboardType()}
					autoCapitalize={getAutoCapitalize()}
					secureTextEntry={type === "password" && !isPasswordVisible}
					placeholderTextColor="#9CA3AF"
					{...props}
				/>
				{type === "password" && (
					<TouchableOpacity
						onPress={() => setIsPasswordVisible(!isPasswordVisible)}
						style={styles.eyeIcon}
					>
						<Ionicons
							name={isPasswordVisible ? "eye-off" : "eye"}
							size={24}
							color="#6B7280"
						/>
					</TouchableOpacity>
				)}
			</View>
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		color: "#374151",
		marginBottom: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 12,
		backgroundColor: "#eeeeee",
		paddingHorizontal: 16,
		height: 48,
	},
	inputError: {
		borderColor: "#EF4444",
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#1F2937",
		height: "100%",
	},
	eyeIcon: {
		padding: 4,
	},
	errorText: {
		color: "#EF4444",
		fontSize: 14,
		marginTop: 4,
	},
});
