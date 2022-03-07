import React, { useState, useEffect, useMemo, useContext } from "react";
import { FlatList } from "react-native";
import { QueryCache, useQueryClient, useInfiniteQuery } from "react-query";

import THEME from "../../../constants/theme.style";
import axios from "../../../utils/axiosInstance";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import habitApi from "../../../utils/api/habit";

import CustomButton from "../../common/CustomButton/CustomButton";
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

const queryCache = new QueryCache();

const MyPageScreen = ({ navigation }) => {
  const [expoToken, setExpoToken] = useState("");
  const [isSuccessClicked, setIsSuccessClicked] = useState(true);

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

  useEffect(() => {
    const updateAlarmSubscription = navigation.addListener("focus", async () => {
      const expoTokenData = await userAsyncStorage.getSavedInfo("expoToken");

      if (expoTokenData) {
        setExpoToken(expoTokenData);
      } else {
        setExpoToken("");
      }
    });

    return updateAlarmSubscription;
  }, [navigation]);

  const handleLogoutButtonClick = () => {
    axios.defaults.headers.Authorization = undefined;
    userAsyncStorage.removeSavedInfo("userInfo");
    setUser({
      id: "",
      name: "",
    });
    queryCache.clear();
    queryClient.clear();
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
          <CustomButton 
            title={expoToken ? "알림 그만 받기": "알림 받기"}
            width={expoToken ? "200px": "140px"}
            onPress={() => navigation.navigate("Alarm")}
          />
        </MyPageButtonContainer>
      </MyPageUserInfoContainer>
      <MyPageResultContainer>
        <MyPageResultTabContainer>
          <MyPageResultTabButton
            isSuccessClicked={isSuccessClicked}
            onPress={() => setIsSuccessClicked(true)}
          >
            <MyPageResultTabImage
              source={require("../../../asset/image/myPage/successListTab.png")}
            />
            <MyPageResultTabText>성공</MyPageResultTabText>
          </MyPageResultTabButton>
          <MyPageResultTabButton
            isSuccessClicked={!isSuccessClicked}
            onPress={() => setIsSuccessClicked(false)}
          >
            <MyPageResultTabImage
              source={require("../../../asset/image/myPage/failureListTab.png")}
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
