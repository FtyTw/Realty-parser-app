import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = ({ style }) => (
	<View
		style={{
			flex: 1,

			justifyContent: "center",
			alignItems: "center",
			...style,
		}}
	>
		<ActivityIndicator size="large" color="orange" />
	</View>
);

export default Spinner;
