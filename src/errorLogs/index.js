import axios from "axios";
import { baseUrl, devMode } from "../constants";

const LogError = async (source, message) => {
	try {
		console.log(source, ":", message);
		if (!devMode) {
			const result = await axios.post(`http://${baseUrl}/api/v1/error`, {
				message,
				source,
			});
		}
	} catch (error) {
		console.log("LogError", error);
	}
};
export default LogError;
