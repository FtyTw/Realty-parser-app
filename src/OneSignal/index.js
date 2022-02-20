import OneSignal from "react-native-onesignal";
import axios from "axios";
import { navigate } from "../navigation";
import { OSAppId } from "../../tokens.json";

export const oneSignalSetAppId = async () => {
	try {
		OneSignal.setAppId(OSAppId);
	} catch (error) {
		console.log("oneSignalSetAppId", error);
	}
};

const onReceived = (notificationReceivedEvent) => {
	let notification = notificationReceivedEvent.getNotification();

	notificationReceivedEvent.complete(notification);
};

const onOpened = (openedEvent) => {
	try {
		console.log("openedEvent", openedEvent);
		const {
			notification: {
				additionalData: { uri: uglyUri, title, announcements, type },
				androidNotificationId: identifier,
			},
		} = openedEvent;
		if (type === "single" || !type) {
			const [uri, key] = uglyUri.split("cat_split");

			navigate("announcement", { uri, key, unseen: true });
		} else {
			const parsed = JSON.parse(announcements);
			navigate("newAnnouncements", { announcements: parsed });
		}
	} catch (error) {
		console.log("onOpened", error);
	}
};

export const setNotificationHandler = (updateListsAndPushes) => {
	OneSignal.setNotificationWillShowInForegroundHandler(
		(notificationReceivedEvent) => {
			if (timeout) {
				clearTimeout(timeout);
			}
			const timeout = setTimeout(updateListsAndPushes, 500);

			return onReceived(notificationReceivedEvent);
		}
	);
};

export const setOnOpenedHandler = () => {
	OneSignal.setNotificationOpenedHandler(onOpened);
};

export default {
	oneSignalSetAppId,
	setNotificationHandler,
	setOnOpenedHandler,
};
