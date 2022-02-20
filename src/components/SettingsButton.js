import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SettingsButton = ({ navigate }) => (
	<MaterialCommunityIcons
		style={{
			width: 40,
			height: 40,
			textAlign: "center",
			lineHeight: 40,
		}}
		name={"cog"}
		color={"#fff"}
		size={20}
		onPress={() => navigate("settings")}
	/>
);

export default SettingsButton;
