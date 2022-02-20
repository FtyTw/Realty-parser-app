import React, { useEffect, useState, useMemo } from "react";
import type { Node } from "react";
import { StatusBar, AppState } from "react-native";
import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PushNotification from "react-native-push-notification";
// import { PressableTest } from "./src/components";
import {
  oneSignalSetAppId,
  setNotificationHandler,
  setOnOpenedHandler,
} from "./src/OneSignal";
import TabNavigator, { navigationRef } from "./src/navigation";
import { ErrorBoundary } from "./src/pages";
import AppContext from "./src/context";
import { defaultColor, baseUrl } from "./src/constants";
// import { setStorageData, getStorageData } from "./src/asyncStorage";

import LogError from "./src/errorLogs";

Icon.loadFont();

const App: () => Node = () => {
  const [lists, setLists] = useState({});
  const [pushes, setPushes] = useState();
  const [mainColor, setMainColor] = useState(defaultColor);
  const [
    subColor,
    // setSubColor
  ] = useState("#ffffff");
  const [
    activeColor,
    // setActiveColor
  ] = useState("#FF0000");

  const getLists = async () => {
    try {
      console.log(`http://${baseUrl}/api/v1/ping`);
      const response = await axios.get(`http://${baseUrl}/api/v1/ping`, {
        params: { catOnly: 1 },
      });
      const result = JSON.parse(response.data);
      setLists(result);
    } catch (error) {
      LogError("getLists", error.message);
    }
  };

  const appStateChangeHandler = (nextAppState) => {
    if (nextAppState === "active") {
      updateListsAndPushes();
    }
  };

  const handleUnseen = async (uri, category, identifier) => {
    try {
      await axios.post(`http://${baseUrl}/api/v1/unseen`, {
        uri,
        category,
      });
      if (identifier) {
        const newPushes = pushes[category].filter(
          ({ identifier: pIdentifier }) => pIdentifier === identifier
        );
        PushNotification.cancelLocalNotification(identifier);
        setPushes(newPushes);
      }
      getLists();
    } catch (error) {
      LogError("handleUnseen", error.message);
    }
  };

  const getPushesCallback = (list) => {
    try {
      const filteredList = [];
      list.forEach((item) => {
        if (item.title === "Realty parser") {
          PushNotification.cancelLocalNotification(item.identifier);
        } else {
          filteredList.push(item);
        }
      });

      const pushes = listReducer(filteredList);
      setPushes(pushes);
    } catch (error) {
      LogError("getPushesCallback", error.message);
    }
  };

  const getPushes = () => {
    PushNotification.getDeliveredNotifications(getPushesCallback);
  };

  const updateListsAndPushes = () => {
    getLists();
    getPushes();
  };

  const listReducer = (list) => {
    try {
      const pushes = list.filter(({ title }) => title !== "Realty parser");
      return pushes.reduce((acc, { body, title, identifier }) => {
        if (!body.includes("cat_split")) {
          return acc;
        }
        const [uri, category] = body.split("cat_split");
        if (category in acc) {
          acc[category].push({ uri, identifier, title });
        } else {
          acc[category] = [{ uri, identifier, title }];
        }
        return acc;
      }, {});
    } catch (error) {
      LogError("listReducer", error.message);
    }
  };

  // const setColor = async () => {
  //   try {
  //     const color = await getStorageData("mainColor");
  //     setMainColor(color);
  //   } catch (error) {
  //     LogError("setColor", error.message);
  //   }
  // };

  useEffect(() => {
    oneSignalSetAppId();
    setNotificationHandler(updateListsAndPushes);
    setOnOpenedHandler();
    updateListsAndPushes();

    const subscription = AppState.addEventListener(
      "change",
      appStateChangeHandler
    );
    return () => {
      subscription.remove();
    };
  }, []);
  const contextObj = useMemo(
    () => ({
      lists,
      handleUnseen,
      refresh: getLists,
      mainColor,
      setMainColor,
      pushes,
    }),
    [lists, pushes]
  );

  return (
    <NavigationContainer
      theme={{
        colors: {
          card: mainColor,
          text: subColor,
          primary: activeColor,
          notification: "blue",
          border: mainColor,
        },
      }}
      ref={navigationRef}
    >
      <AppContext.Provider value={contextObj}>
        <StatusBar
          backgroundColor={defaultColor}
          animated
          barStyle="light-content"
        />
        <ErrorBoundary>
          <TabNavigator />
        </ErrorBoundary>
      </AppContext.Provider>
    </NavigationContainer>
  );
};

export default App;
