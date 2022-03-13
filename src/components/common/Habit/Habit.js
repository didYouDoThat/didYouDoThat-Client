import React from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useMutation, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import useGetDateInfo from "../../../utils/useGetDateInfo";
import changeServerEndDateIntoLocalDate from "../../../utils/changeServerDateIntoLocalDate";
import THEME from "../../../constants/theme.style";
import { QUERY_KEY_NAME } from "../../../constants/keyName";

import DeleteSwipe from "../DeleteSwipe/DeleteSwipe";
import {
  HabitContentContainer,
  HabitTextContainer,
  HabitCatImage,
  HabitStatusContainer,
  HabitStatusImage,
  HabitStatusText,
  HabitTitle,
  HabitEndDate,
  HabitExpiredText,
} from "./Habit.style";

const Habit = ({ habitData, currentDate, isExpired, width }) => {
  const inform = useInform();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(QUERY_KEY_NAME.userInfo);

  const localEndDate = changeServerEndDateIntoLocalDate(habitData.endDate);
  const [fullYear, fullMonth, fullDate] = useGetDateInfo(localEndDate);

  const isActive = localEndDate - currentDate >= 0;

  const isCheckedToday = habitData.dateList.find(({ date }) => {
    const limitDate = changeServerEndDateIntoLocalDate(date);
    const currentTodayDate = new Date(currentDate);

    return limitDate.getDate() - 1 === currentTodayDate.getDate();
  })?.isChecked;

  const { mutate, isLoading } = useMutation(habitApi.updateHabitStatus, {
    onError: (error) => {
      inform({ message: error.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY_NAME.habitList, userInfo.id]);
    },
  });

  const handleHabitContainerClick = () => {
    mutate({
      habitId: habitData.id,
      userId: userInfo.id,
      localTimeOffset: -currentDate.getTimezoneOffset() / 60,
    });
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => {
          return isActive ? <DeleteSwipe habitData={habitData} /> : null;
        }}
      >
        <HabitContentContainer
          style={{
            backgroundColor:
              !isExpired && isCheckedToday ? "#FFF1E9" : THEME.white,
          }}
          onPress={
            isActive
              ? handleHabitContainerClick
              : () => {
                  navigation.navigate("Result", {
                    screen: "EndHabitResult",
                    params: { habitData },
                  });
                }
          }
          width={width}
        >
          {isLoading ? (
            <ActivityIndicator color={THEME.gray} />
          ) : (
            <>
              <HabitCatImage source={{ uri: habitData.catImage }} />
              <HabitTextContainer>
                <HabitTitle
                  style={{
                    color:
                      !isExpired && isCheckedToday
                        ? THEME.mainStrongColor
                        : THEME.black,
                    textDecorationLine:
                      !isExpired && isCheckedToday ? "line-through" : "none",
                    textShadowColor:
                      !isExpired && isCheckedToday
                        ? THEME.subStrongColor
                        : THEME.white,
                    textShadowRadius: !isExpired && isCheckedToday ? 5 : 0,
                  }}
                >
                  {habitData.title}
                </HabitTitle>
                {isActive ? (
                  <HabitEndDate>
                    종료: {fullYear}. {fullMonth}. {fullDate} 00시
                  </HabitEndDate>
                ) : !isExpired ? (
                  <HabitExpiredText>습관 만들기 종료!</HabitExpiredText>
                ) : null}
              </HabitTextContainer>
            </>
          )}
          <HabitStatusContainer>
            <HabitStatusImage
              source={require("../../../asset/image/status.png")}
            />
            <HabitStatusText>X {habitData.status}</HabitStatusText>
          </HabitStatusContainer>
        </HabitContentContainer>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

Habit.propTypes = {
  habitData: PropTypes.shape({
    endDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    dateList: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    catImage: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  }),
  currentDate: PropTypes.object.isRequired,
  isExpired: PropTypes.bool,
  width: PropTypes.string,
};

export default Habit;
