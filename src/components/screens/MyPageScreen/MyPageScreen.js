import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { QueryCache, useQueryClient } from "react-query";
import * as Notifications from "expo-notifications";

import axios from "../../../utils/axiosInstance";
import registerForPushNotificationsAsync from "../../../utils/registerForPushNotificationsAsync";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import CustomButton from "../../common/Button";
import { UserContext } from "../../common/userContextProvider";
import useInform from "../../../utils/informAlert";

const queryCache = new QueryCache();

const MyPageScreen = () => {
  const [expoToken, setExpoToken] = useState("");
  const { user, setUser } = useContext(UserContext);

  const inform = useInform();
  const queryClient = useQueryClient();

  useEffect(async () => {
    const expoTokenData = await userAsyncStorage.getExpoToken();

    if (expoTokenData) {
      setExpoToken(expoTokenData);
    }
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const handleLogoutButtonClick = () => {
    axios.defaults.headers.Authorization = undefined;
    userAsyncStorage.removeUserInfo();
    setUser({
      id: "",
      name: "",
    });
    queryCache.clear();
    queryClient.clear();
  };

  const handleLocalAppPushButtonClick = async () => {
    const token = await registerForPushNotificationsAsync();

    if (token) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "오늘도 그거했냥🐱",
          body: "지금 바로 여러분의 습관 만들기를 시작해봅시다👏",
          categoryId: "default",
          android: {
            vibrate: true,
            channelId: "default",
            sound: false,
          },
        },
        trigger: {
          hour: 10,
          minute: 0,
          repeats: true,
        },
      });
      setExpoToken(token);
      userAsyncStorage.setExpoToken(token);
      inform({ message: "알림받기가 성공적으로 처리 되었습니다." });
      return;
    }

    return inform({ message: "알림받기가 정상적으로 처리되지 않았습니다." });
  };

  const handleLocalAppPushStopButtonClick = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setExpoToken("");
    userAsyncStorage.removeExpoToken();
    inform({ message: "앞으로 알림은 발송되지 않습니다." });
  };

  return (
    <View>
      <Text>This is MyPage</Text>
      <CustomButton title="로그아웃" onPress={handleLogoutButtonClick} />
      {!expoToken ? (
        <CustomButton
          title="알림 받기"
          onPress={handleLocalAppPushButtonClick}
        />
      ) : (
        <CustomButton
          title="알림 그만 받기"
          onPress={handleLocalAppPushStopButtonClick}
        />
      )}
    </View>
  );
};

export default MyPageScreen;
