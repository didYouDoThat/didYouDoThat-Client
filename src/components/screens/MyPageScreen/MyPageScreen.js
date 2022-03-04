import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { QueryCache, useQueryClient } from "react-query";
import * as Notifications from "expo-notifications";

import { notificationSetting } from "../../../configs/notificationSetting";
import axios from "../../../utils/axiosInstance";
import registerForPushNotificationsAsync from "../../../utils/registerForPushNotificationsAsync";
import useInform from "../../../utils/informAlert";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import CustomButton from "../../common/Button";
import { UserContext } from "../../common/userContextProvider";

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
      Notifications.scheduleNotificationAsync(notificationSetting);
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
        <>
          <CustomButton
            title="알림 받기"
            onPress={handleLocalAppPushButtonClick}
          />
          <Text>알림은 매일 오전 10시에 발송됩니다!</Text>
        </>
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
