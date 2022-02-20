import React, { useContext, useEffect, useState } from "react";
import { Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import { GoBackButton, SettingsButton } from "../components";
import images from "../assets/images";
import AppContext from "../context";
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
}
export function goBack(name, params) {
	if (navigationRef.isReady()) {
		navigationRef.goBack();
	}
}

import {
	ListScreen,
	SettingsScreen,
	ListDetails,
	Announcement,
	NewAnnouncements,
} from "../pages";

import { defaultColor } from "../constants";
const headerTitleStyle = { color: "#fff", fontSize: 20 };

const headerStyle = { backgroundColor: defaultColor };
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const { lists: unseen } = useContext(AppContext);
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					height: 80,
					paddingBottom: 10,
					alignItems: "center",
				},
				tabBarLabelStyle: {
					fontSize: 14,
					fontWeight: "bold",
				},
			}}
		>
			<Tab.Screen
				key={"olx"}
				name={"OLX"}
				component={ListScreen}
				options={{
					tabBarBadgeStyle: {
						backgroundColor: !!unseen[`olxCount`]
							? "#FF0000"
							: "transparent",
						color: "#fff",
					},
					tabBarBadge:
						unseen[`olxCount`] > 0 ? unseen[`olxCount`] : "",

					headerRight: () => <SettingsButton navigate={navigate} />,
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<Image
								resizeMode="cover"
								style={{
									width: 35,
									height: 35,
									borderRadius: 35,
								}}
								source={images["olx"]}
							/>
						);
					},
				}}
			></Tab.Screen>
			<Tab.Screen
				key={"besplatka"}
				name={"BESPLATKA"}
				component={ListScreen}
				options={{
					tabBarBadgeStyle: {
						backgroundColor: !!unseen[`besplatkaCount`]
							? "#FF0000"
							: "transparent",
						color: "#fff",
					},

					tabBarBadge:
						unseen[`besplatkaCount`] > 0
							? unseen[`besplatkaCount`]
							: "",
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<Image
								resizeMode="stretch"
								style={{
									width: 35,
									height: 35,
									borderRadius: 35,
								}}
								source={images["besplatka"]}
							/>
						);
					},
				}}
			></Tab.Screen>
			<Tab.Screen
				key={"domria"}
				name={"DOMRIA"}
				component={ListScreen}
				options={{
					tabBarBadgeStyle: {
						backgroundColor: unseen[`domriaCount`]
							? "#FF0000"
							: "transparent",
						color: "#fff",
					},
					tabBarBadge:
						unseen[`domriaCount`] > 0 ? unseen[`domriaCount`] : "",
					tabBarIcon: ({ color, size, focused }) => {
						return (
							<Image
								resizeMode="cover"
								style={{
									width: 35,
									height: 35,
									borderRadius: 35,
								}}
								source={images["domria"]}
							/>
						);
					},
				}}
			></Tab.Screen>
		</Tab.Navigator>
	);
};
const MainStack = () => (
	<Stack.Navigator>
		<Stack.Screen
			key="lists"
			name="Списки"
			component={TabNavigator}
			options={{ headerShown: false }}
		></Stack.Screen>
		<Stack.Screen
			{...{
				name: "details",
				component: ListDetails,
				options: ({
					route: {
						params: { title, data },
					},
				}) => ({
					title,
					headerLeft: ({ canGoBack, ...rest }) => (
						<GoBackButton canGoBack={canGoBack} goBack={goBack} />
					),
				}),
			}}
		></Stack.Screen>
		<Stack.Screen
			{...{
				name: "announcement",
				component: Announcement,

				options: ({
					route: {
						params: { title, data },
					},
				}) => ({
					title: "Детали объявления",
					headerLeft: ({ canGoBack, ...rest }) => (
						<GoBackButton canGoBack={canGoBack} goBack={goBack} />
					),
				}),
			}}
		></Stack.Screen>
		<Stack.Screen
			{...{
				name: "newAnnouncements",
				component: NewAnnouncements,

				options: {
					title: "Новые объявления:",
					headerLeft: ({ canGoBack, ...rest }) => (
						<GoBackButton canGoBack={canGoBack} goBack={goBack} />
					),
				},
			}}
		></Stack.Screen>
		<Stack.Screen
			{...{
				name: "settings",
				component: SettingsScreen,

				options: {
					title: "Настройки",
					headerLeft: ({ canGoBack, ...rest }) => (
						<GoBackButton canGoBack={canGoBack} goBack={goBack} />
					),
				},
			}}
		></Stack.Screen>
	</Stack.Navigator>
);

export default MainStack;
