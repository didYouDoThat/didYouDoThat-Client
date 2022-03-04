import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";

const registerForPushNotificationsAsync = async () => {
  let token = "";

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrate: [0, 250, 250, 250],
    });
  }

  return token;
};

export default registerForPushNotificationsAsync;
