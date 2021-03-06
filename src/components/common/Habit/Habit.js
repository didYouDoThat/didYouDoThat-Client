import React from "react";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useMutation, useQueryClient } from "react-query";

import PropTypes from "prop-types";
import { Feather } from '@expo/vector-icons';

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import useGetDateInfo from "../../../utils/useGetDateInfo";
import changeServerEndDateIntoLocalDate from "../../../utils/changeServerDateIntoLocalDate";
import THEME from "../../../constants/theme.style";
import { QUERY_KEY_NAME } from "../../../constants/keyName";

import SwipeBox from "../SwipeBox/SwipeBox";
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

  const { mutate } = useMutation(habitApi.updateHabitStatus, {
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
          return isActive ? (
            <>
              <SwipeBox habitData={habitData} color="#f3bda1" screenName="Delete">
                <Feather name="trash" size={35} color={THEME.white} />
              </SwipeBox>
              <SwipeBox habitData={habitData} color="#c3e6dc" screenName="CheckStatus">
                <Feather name="calendar" size={35} color={THEME.white} />
              </SwipeBox>
            </>
          ) : null;
        }}
      >
        <HabitContentContainer
          style={{
            backgroundColor:
              !isExpired && isCheckedToday ? "#fff1e9" : THEME.white,
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
                ??????: {fullYear}. {fullMonth}. {fullDate} 00???
              </HabitEndDate>
            ) : !isExpired ? (
              <HabitExpiredText>?????? ????????? ??????!</HabitExpiredText>
            ) : null}
          </HabitTextContainer>
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
