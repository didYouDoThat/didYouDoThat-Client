import { useCallback } from "react";
import { ToastAndroid } from "react-native";

const useInform = () => {
  const inform = useCallback(({ message }) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }, []);

  return inform;
};

export default useInform;
