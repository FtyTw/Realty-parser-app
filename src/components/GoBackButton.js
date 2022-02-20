import React from "react";
import { Pressable, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GoBackButton = ({ canGoBack, goBack }) =>
	canGoBack && (
		<Pressable
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-around",

				borderRadius: 10,
				width: 50,
			}}
			onPress={goBack}
		>
			<MaterialCommunityIcons
				name={"arrow-left-circle"}
				color={"#fff"}
				size={30}
			/>
		</Pressable>
	);

export default GoBackButton;
