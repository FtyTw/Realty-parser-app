import AsyncStorage from "@react-native-async-storage/async-storage";
export const setStorageData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.log("storeData", e);
	}
};

export const getStorageData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		return JSON.parse(value);
	} catch (e) {
		console.log("getData", e);
	}
};
export default {
	setStorageData,
	getStorageData,
};
