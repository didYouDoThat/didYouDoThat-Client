import React, { useState, useEffect, useMemo, useContext } from "react";
import { FlatList } from "react-native";
import { QueryCache, useQueryClient, useInfiniteQuery } from "react-query";
import * as Notifications from "expo-notifications";

import { notificationSetting } from "../../../configs/notificationSetting";
import axios from "../../../utils/axiosInstance";
import registerForPushNotificationsAsync from "../../../utils/registerForPushNotificationsAsync";
import useInform from "../../../utils/informAlert";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import habitApi from "../../../utils/api/habit";

import CustomButton from "../../common/Button";
import { UserContext } from "../../common/userContextProvider";
import Habit from "../../common/Habit/Habit";

import {
  MyPageScreenContainter,
  MyPageUserInfoContainer,
  MyPageUserNameText,
  MyPageButtonContainer,
  MyPageResultContainer,
  MyPageResultTabContainer,
  MyPageResultTabButton,
  MyPageResultTabImage,
  MyPageResultTabText,
  MyPageResultHabitListContainer,
} from "./MyPageScreen.style";
import THEME from "../../../constants/theme.style";

const queryCache = new QueryCache();

const MyPageScreen = () => {
  const [expoToken, setExpoToken] = useState("");
  const [isSuccessClicked, setIsSuccessClicked] = useState(true);

  const inform = useInform();
  const queryClient = useQueryClient();
  const { user, setUser } = useContext(UserContext);

  const { data, fetchNextPage } = useInfiniteQuery(
    ["expiredHabitList", user.id, isSuccessClicked],
    habitApi.getExpiredSuccessHabitList,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.habitList.length === 5 ? lastPage.nextPage : undefined;
      },
    }
  );

  const expiredHabitList = useMemo(() => {
    const initialHabitList = [];
    data?.pages.forEach(({ habitList }) => initialHabitList.push(...habitList));

    return initialHabitList;
  }, [data]);

  useEffect(async () => {
    const expoTokenData = await userAsyncStorage.getExpoToken();

    if (expoTokenData) {
      setExpoToken(expoTokenData);
    }
  }, []);

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

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

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
    <MyPageScreenContainter>
      <MyPageUserInfoContainer>
        <MyPageUserNameText>
          오늘도 {user.name} 님의 습관을 위해!
        </MyPageUserNameText>
        <MyPageButtonContainer>
          <CustomButton
            color={THEME.subStrongColor}
            width="140px"
            title="로그아웃"
            onPress={handleLogoutButtonClick}
          />
          {!expoToken ? (
            <CustomButton
              color={THEME.subStrongColor}
              width="140px"
              title="알림 받기"
              onPress={handleLocalAppPushButtonClick}
            />
          ) : (
            <CustomButton
              color={THEME.subStrongColor}
              width="200px"
              title="알림 그만 받기"
              onPress={handleLocalAppPushStopButtonClick}
            />
          )}
        </MyPageButtonContainer>
      </MyPageUserInfoContainer>
      <MyPageResultContainer>
        <MyPageResultTabContainer>
          <MyPageResultTabButton
            isSuccessClicked={isSuccessClicked}
            onPress={() => setIsSuccessClicked(true)}
          >
            <MyPageResultTabImage
              source={require("../../../asset/image/successListTab.png")}
            />
            <MyPageResultTabText>성공</MyPageResultTabText>
          </MyPageResultTabButton>
          <MyPageResultTabButton
            isSuccessClicked={!isSuccessClicked}
            onPress={() => setIsSuccessClicked(false)}
          >
            <MyPageResultTabImage
              source={require("../../../asset/image/failureListTab.png")}
            />
            <MyPageResultTabText>실패</MyPageResultTabText>
          </MyPageResultTabButton>
        </MyPageResultTabContainer>
        <MyPageResultHabitListContainer>
          <FlatList
            data={expiredHabitList}
            renderItem={({ item }) => (
              <Habit
                habitData={item}
                currentDate={new Date()}
                isExpired={true}
                width="100%"
              />
            )}
            keyExtractor={(item, index) => item.id}
            onEndReachedThreshold={0.2}
            onEndReached={fetchNextPage}
          />
        </MyPageResultHabitListContainer>
      </MyPageResultContainer>
    </MyPageScreenContainter>
  );
};

export default MyPageScreen;
