import React, { useContext, useState, useEffect } from "react";

import {
	View,
	ScrollView,
	Text,
	Pressable,
	RefreshControl,
} from "react-native";
import AppContext from "../context";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ListScreen = ({ navigation, route }) => {
	const { refresh, lists } = useContext(AppContext);
	const [listData, setListData] = useState({});
	const [
		refreshing,
		// setRefreshing
	] = useState(false);

	const pressHandler = (fineText, key) => {
		const params = {
			title: fineText.toUpperCase(),
			key,
		};
		navigation.navigate("details", params);
	};

	const getText = (key) => {
		const [source, place, type] = key.split("_");
		const places = {
			odessa: "Одессе",
			kominternovo: "Коминтерново",
			kryzhanovka: "Крыжановке",
			leski: "Лесках",
			fontanka: "Фонтанке",
			shevchenko: "Пос.Шевченко",
			vapnyarka: "Вапнярке",
			gvardeyskoe: "Гвардейском",
			korsuntsy: "Корсунцах",
			krasnoselka: "Красноселке",
			"novaya-dofinovka": "Нов.Дофиновке",
			aleksandrovka: "Александровке",
			pervomayskoe: "Первомайском",
			sverdlovo: "Свердлово",
		};
		const types = {
			flats: "Комнаты",
			appartaments: "Квартиры",
			houses: "Дома",
		};
		const postfix =
			place in places && type in types
				? `${types[type]} в ${places[place]}`
				: "";

		return postfix || `${source.toUpperCase()}`;
	};

	useEffect(() => {
		if (lists) {
			setListData(lists[`${route.name.toLowerCase()}Categories`]);
		}
	}, [lists]);
	return (
		<ScrollView
			contentContainerStyle={{
				flexDirection: "row",
				flexWrap: "wrap",
				paddingVertical: 10,
			}}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={refresh} />
			}
		>
			{!!listData &&
				!!listData?.length &&
				listData.map((category) => {
					const { categoriesCount } = lists;
					const badge =
						category in categoriesCount
							? categoriesCount[category]
							: 0;
					const [, , type] = category.split("_");
					const icons = {
						houses: "home",
						appartaments: "office-building",
						flats: "bed-double-outline",
					};
					const fineText = getText(category);
					return (
						<Pressable
							key={category}
							onPress={() => pressHandler(fineText, category)}
							style={{
								marginTop: 10,
								marginLeft: "1.5%",
								marginRight: "1.5%",
								backgroundColor: badge ? "red" : "orange",
								borderRadius: 10,
								height: 120,
								width: "30%",
								elevation: 3,
								justifyContent: "space-around",
								alignItems: "center",
								position: "relative",
							}}
						>
							{!!badge && (
								<View
									style={{
										width: 30,
										padding: 3,
										height: 30,
										borderRadius: 30,
										backgroundColor: "orange",
										position: "absolute",
										right: 15,
										top: 2,
										elevation: 4,
									}}
								>
									<Text
										style={{
											color: "#fff",
											textAlign: "center",
											lineHeight: 20,
											fontSize: 12,
											fontWeight: "bold",
										}}
									>
										{badge}
										{/*222*/}
									</Text>
								</View>
							)}
							<MaterialCommunityIcons
								name={icons[type]}
								color={"#fff"}
								size={30}
								style={{
									width: 50,
									height: 50,
									backgroundColor: badge ? "orange" : "red",
									textAlign: "center",
									borderRadius: 50,
									lineHeight: 50,
								}}
							/>
							<Text
								style={{
									textAlign: "center",
									fontWeight: "bold",
									color: badge ? "orange" : "red",
								}}
							>
								{fineText}
							</Text>
						</Pressable>
					);
				})}
		</ScrollView>
	);
};

export default ListScreen;
