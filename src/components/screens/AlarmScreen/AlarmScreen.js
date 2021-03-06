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
        <AlarmTitle>?????? ??????</AlarmTitle>
        <AlarmNoticeText>
          {hasAlarmSchedule
            ? "???????????? ????????? ????????? ?????? ???????????????????"
            : "????????? ?????? ?????? 10?????? ????????? ???????????????:)"}
        </AlarmNoticeText>
        <AlarmWarningText>
          {hasAlarmSchedule
            ? `?????? ????????????,${"\n"}????????? ?????? ????????? ?????? ??? ?????????!`
            : `?????? ????????? ?????????,${"\n"}????????? ????????? ????????? ??? ?????????!`}
        </AlarmWarningText>
        <CustomButton
          title={hasAlarmSchedule ? "?????? ?????? ??????" : "?????? ??????"}
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
