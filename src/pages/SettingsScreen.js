import React, { Component, useRef, useState, useContext } from "react";
import { View, ScrollView, Text } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

import { setStorageData, getStorageData } from "../asyncStorage";
import AppContext from "../context";

const Settings = () => {
	return (
		<AppContext.Consumer>
			{(value) => <SettingsScreen colorHandling={value} />}
		</AppContext.Consumer>
	);
};

class SettingsScreen extends Component {
	constructor(props) {
		super(props);
		const { mainColor, setMainColor } = props.colorHandling;
		this.state = {
			currentColor: mainColor,
		};
		this.setMainColor = setMainColor;
	}

	onColorChange = async (color) => {
		await setStorageData("mainColor", color);
		this.setMainColor(color);
	};

	render() {
		return (
			<View
				style={{
					paddingHorizontal: 20,
					flex: 1,
					backgroundColor: "#fff",
				}}
			>
				<View style={{ height: "30%" }}>
					<ColorPicker
						ref={(r) => {
							this.picker = r;
						}}
						color={this.state.currentColor}
						onColorChange={this.onColorChange}
						thumbSize={40}
						sliderSize={40}
						noSnap={true}
						row={false}
					/>
				</View>
			</View>
		);
	}
}

export default Settings;
