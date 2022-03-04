import React, { useContext } from "react";
import { View, Text } from "react-native";
import { QueryCache, useQueryClient } from "react-query";
import * as Notifications from "expo-notifications";

import axios from "../../../utils/axiosInstance";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import CustomButton from "../../common/Button";
import { UserContext } from "../../common/userContextProvider";

const queryCache = new QueryCache();

const MyPageScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();

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

  const handleLocalAppPushButtonClick = () => {
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
  };

  const handleLocalAppPushStopButtonClick = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return (
    <View>
      <Text>This is MyPage</Text>
      <CustomButton title="로그아웃" onPress={handleLogoutButtonClick} />
      <CustomButton title="알림 받기" onPress={handleLocalAppPushButtonClick} />
      <CustomButton
        title="알림 그만 받기"
        onPress={handleLocalAppPushStopButtonClick}
      />
    </View>
  );
};

export default MyPageScreen;
