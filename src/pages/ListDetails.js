import React, { useEffect, useState, useContext, useMemo } from "react";
import { ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import { ListItem } from "../components";
import { baseUrl } from "../constants";

import AppContext from "../context";

const ListDetails = ({
	navigation,
	route: {
		params: { key },
	},
}) => {
	const [mainData, setMainData] = useState([]);
	const [loading, setLoading] = useState(false);
	const {
		lists: { categoriesCount },
	} = useContext(AppContext);

	const localCounter = useMemo(
		() => categoriesCount[key],
		[categoriesCount, key]
	);

	const getCategoryByKey = async (category) => {
		try {
			setLoading(true);
			const { data: result } = await axios.get(
				`http://${baseUrl}/api/v1/ping`,
				{
					params: { category },
				}
			);
			const categoryList = JSON.parse(result);
			setMainData(categoryList);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (localCounter) {
			getCategoryByKey(key);
		}
	}, [localCounter]);

	useEffect(() => {
		if (!mainData?.length) {
			getCategoryByKey(key);
		}
	}, []);

	const pressHandler = (uri, key, unseen) => {
		const newData = [
			...mainData.map((item) => {
				if (uri === item.uri) {
					item.unseen = 0;
				}
				return item;
			}),
		];
		setMainData(newData);
		navigation.navigate("announcement", { uri, key, unseen });
	};

	return (
		<ScrollView
			style={{
				flex: 1,
				paddingHorizontal: 10,
				backgroundColor: "#fff",
			}}
			contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }}
			refreshControl={
				<RefreshControl
					refreshing={loading}
					onRefresh={() => getCategoryByKey(key)}
				/>
			}
		>
			{!!mainData?.length &&
				mainData.map(({ uri, title, unseen }, index) => {
					return (
						<ListItem
							key={`${uri}-${index}`}
							onPress={() => pressHandler(uri, key, unseen)}
							text={title}
							unseen={unseen}
						/>
					);
				})}
		</ScrollView>
	);
};

export default ListDetails;
