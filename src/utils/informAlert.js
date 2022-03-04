import { useCallback } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";

const useInform = () => {
  const inform = useCallback(({ message }) => {
    if (Platform.OS === "ios") {
      Alert.alert(title ?? 알림, message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, []);

  return inform;
};

export default useInform;
