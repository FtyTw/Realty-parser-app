import React from "react";
import { ScrollView } from "react-native";
import { ListItem } from "../components";

const NewAnnouncements = ({
	navigation,
	route: {
		params: { announcements },
	},
}) => {
	const pressHandler = (uri, key, unseen) => {
		navigation.navigate("announcement", { uri, key, unseen });
	};
	return (
		<ScrollView
			style={{
				flex: 1,
				paddingHorizontal: 10,
				backgroundColor: "#fff",
			}}
		>
			{announcements?.length &&
				announcements.map(({ uri, title, category }, index) => (
					<ListItem
						key={`${uri}-${index}`}
						onPress={() => pressHandler(uri, category, true)}
						text={title}
					/>
				))}
		</ScrollView>
	);
};

export default NewAnnouncements;
