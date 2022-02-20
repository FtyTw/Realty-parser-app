import React, { useEffect, useState, useContext } from "react";
import { Text } from "react-native";
import { WebView } from "react-native-webview";
import { Spinner } from "../components";
import AppContext from "../context";

const Announcement = ({
	route: {
		params: { uri = false, key = false, unseen },
	},
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const { handleUnseen, pushes } = useContext(AppContext);
	useEffect(() => {
		try {
			if (uri && key && unseen) {
				const { identifier } =
					key in pushes
						? pushes[key].find(({ uri: pushUri }) =>
								pushUri.includes(uri)
						  )
						: { identifier: null };
				handleUnseen(uri, key, identifier);
			}
		} catch (error) {
			console.log("Announcement", error);
		}
	}, []);
	return (
		<>
			<WebView
				onError={(syntheticEvent) => {
					const { nativeEvent } = syntheticEvent;
					console.warn("WebView error: ", nativeEvent);
				}}
				onLoad={() => {
					setIsLoading(false);
				}}
				source={{ uri }}
			/>
			<Spinner
				style={{
					position: "absolute",
					backgroundColor: "#fff",
					width: isLoading ? "100%" : 0,
					height: isLoading ? "100%" : 0,
					opacity: +isLoading,
				}}
			/>
		</>
	);
};

export default Announcement;
