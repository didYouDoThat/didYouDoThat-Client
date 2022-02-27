import { useCallback } from "react";
import { ToastAndroid } from "react-native";

//ios 배포 진행 시, ios 전용도 추가해줄 것.

const useInform = () => {
  const inform = useCallback(({ message }) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }, []);

  return inform;
};

export default useInform;
