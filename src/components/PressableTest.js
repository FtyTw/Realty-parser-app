import React from "react";
import { Pressable, Text, View } from "react-native";
import { TestData, sendTestPush } from "../tests";

const TestComponent = () => (
	<View style={{ paddingHorizontal: 10 }}>
		{TestData.map((i, index) => (
			<Pressable
				key={`${i.category}+${index}`}
				style={{
					width: "100%",
					height: 60,
					backgroundColor: "lightblue",
					borderWidth: 2,
					borderColor: "blue",
					borderRadius: 30,
					marginBottom: 5,
					alignItems: "center",
					justifyContent: "center",
				}}
				onPress={() => sendTestPush(TestData, index)}
			>
				<Text>{i.category}</Text>
			</Pressable>
		))}
	</View>
);

export default TestComponent;
