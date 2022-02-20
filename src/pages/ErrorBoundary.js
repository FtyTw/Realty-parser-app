import React, { Component } from "react";
import { View, Text } from "react-native";
import LogError from "../errorLogs";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error: error.message };
	}

	componentDidCatch(error, errorInfo) {
		const { componentStack } = errorInfo;
		const [source, sourceBackUp] = componentStack.split(/\n/g);
		LogError(source || sourceBackUp, error.message);
	}

	render() {
		if (this.state.hasError) {
			return (
				<View
					style={{
						backgroundColor: "orange",
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							color: "red",
							fontSize: 20,
							fontWeight: "bold",
							textAlign: "center",
							fontStyle: "italic",
						}}
					>
						{" "}
						К сожалению, что-то пошло не так, пожалуйста,
						перезапустите приложение
						{this.state.error || ""}
					</Text>
				</View>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
