import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import * as Notifications from "expo-notifications";

import { notificationSetting } from "../../../configs/notificationSetting";
import useInform from "../../../utils/informAlert";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import { STORAGE_KEY_NAME } from "../../../constants/keyName";

import CustomButton from "../../common/CustomButton/CustomButton";
import ModalForScreen from "../../common/ModalForScreen/ModalForScreen";
import {
  AlarmScreenContainer,
  AlarmTitle,
  AlarmNoticeText,
  AlarmWarningText,
} from "./AlarmScreen.style";

const AlarmScreen = () => {
  const [hasAlarmSchedule, setHasAlarmSchedule] = useState(false);

  const navigation = useNavigation();
  const inform = useInform();

  useEffect(() => {
    const updateAlarmSubscription = navigation.addListener(
      "focus",
      async () => {
        const expoTokenData = await userAsyncStorage.getSavedInfo(
          STORAGE_KEY_NAME.alarmToken
        );

        if (expoTokenData) {
          setHasAlarmSchedule(true);
        }
      }
    );

    return updateAlarmSubscription;
  }, [navigation]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const handleLocalAppPushButtonClick = () => {
    Notifications.scheduleNotificationAsync(notificationSetting);
    userAsyncStorage.setInfo(STORAGE_KEY_NAME.alarmToken, true);
    setHasAlarmSchedule(true);

    navigation.goBack();
    return;
  };

  const handleLocalAppPushStopButtonClick = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      userAsyncStorage.removeSavedInfo(STORAGE_KEY_NAME.alarmToken);
      setHasAlarmSchedule(false);

      navigation.goBack();
    } catch (err) {
      inform({ message: err.message });
    }
  };

  return (
    <ModalForScreen contentHeight="330px">
      <AlarmScreenContainer>
        <AlarmTitle>알림 설정</AlarmTitle>
        <AlarmNoticeText>
          {hasAlarmSchedule
            ? "지금까지 받아온 알림을 그만 받아보실래요?"
            : "앞으로 매일 오전 10시에 알람이 발송됩니다:)"}
        </AlarmNoticeText>
        <AlarmWarningText>
          {hasAlarmSchedule
            ? `지금 해제해도,${"\n"}언제든 다시 알림을 받을 수 있어요!`
            : `지금 알람을 받아도,${"\n"}언제든 알림을 취소할 수 있어요!`}
        </AlarmWarningText>
        <CustomButton
          title={hasAlarmSchedule ? "알림 그만 받기" : "알림 받기"}
          onPress={
            hasAlarmSchedule
              ? handleLocalAppPushStopButtonClick
              : handleLocalAppPushButtonClick
          }
        />
      </AlarmScreenContainer>
    </ModalForScreen>
  );
};

export default AlarmScreen;
