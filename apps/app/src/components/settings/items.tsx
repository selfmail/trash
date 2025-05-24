import { Feather } from "@expo/vector-icons";
import { Text, View } from "../Themed";

export const ItemListTopItem = ({
	text,
	icon,
}: { text: string; icon: string }) => {
	return (
		<View
			style={{
				width: "80%",
				paddingRight: 20,
				borderTopLeftRadius: 20,
				borderTopRightRadius: 20,
				paddingLeft: 20,
				paddingTop: 15,
				paddingBottom: 5,
				display: "flex",
				backgroundColor: "#eeeeee",
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<Feather name={icon as any} size={20} color="#555555" />
			<Text
				style={{
					fontSize: 20,
					fontWeight: "500",
					marginLeft: 10,
					color: "#555555",
				}}
			>
				{text}
			</Text>
		</View>
	);
};

export const ItemListItem = ({
	text,
	icon,
}: { text: React.ReactNode; icon: string }) => {
	return (
		<View
			style={{
				width: "80%",
				paddingRight: 20,
				paddingLeft: 20,
				paddingTop: 5,
				paddingBottom: 5,
				display: "flex",
				backgroundColor: "#eeeeee",
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<Feather name={icon as any} size={20} color="#555555" />
			<Text
				style={{
					fontSize: 20,
					fontWeight: "500",
					marginLeft: 10,
					color: "#555555",
				}}
			>
				{text}
			</Text>
		</View>
	);
};

export const ItemListBottomItem = ({
	text,
	icon,
}: { text: React.ReactNode; icon: string }) => {
	return (
		<View
			style={{
				width: "100%",
				paddingRight: 20,
				borderBottomLeftRadius: 20,
				borderBottomRightRadius: 20,
				paddingLeft: 20,
				paddingTop: 5,
				paddingBottom: 15,
				display: "flex",
				backgroundColor: "#eeeeee",
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<Feather name={icon as any} size={20} color="#555555" />
			<Text
				style={{
					fontSize: 20,
					fontWeight: "500",
					marginLeft: 10,
					color: "#555555",
				}}
			>
				{text}
			</Text>
		</View>
	);
};
