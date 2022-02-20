import React, { useContext } from "react";

import { View, Pressable, Text, Image } from "react-native";
import AppContext from "../context";
const ListItem = ({
	onPress,
	text,
	textAlign = "center",
	justifyContent = "center",
	badge = 0,
	image = null,
	unseen,
}) => {
	const { mainColor } = useContext(AppContext);
	return (
		<Pressable
			onPress={onPress}
			style={{
				width: "100%",
				height: 60,
				justifyContent,
				alignItems: "center",

				marginTop: 5,
				backgroundColor: unseen ? "red" : mainColor,

				borderRadius: 20,
				flexDirection: "row",
				paddingHorizontal: 10,
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.22,
				shadowRadius: 2.22,

				elevation: 3,
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				{image ? (
					<Image
						style={{
							width: 40,
							height: 40,
							resizeMode: "contain",
							alignItems: "center",
							justifyContent: "center",
							marginRight: 10,
							borderRadius: 15,
						}}
						source={image}
					/>
				) : null}
				<Text
					numberOfLines={2}
					ellipsizeMode={"tail"}
					style={{ textAlign, fontSize: 20, color: "#fff" }}
				>
					{text}
				</Text>
			</View>

			{badge ? (
				<View
					style={{
						width: 30,
						height: 30,
						borderRadius: 30,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: mainColor,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,

						elevation: 3,
					}}
				>
					<Text
						style={{
							fontSize: 16,
							color: "#fff",
							fontWeight: "bold",
						}}
					>
						{badge}
					</Text>
				</View>
			) : null}
		</Pressable>
	);
};

export default ListItem;
