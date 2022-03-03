import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import {
  HabitContentContainer,
  HabitContentCheckedContainer,
  HabitTextContainer,
  HabitCatImage,
  HabitStatusContainer,
  HabitStatusImage,
  HabitStatusText,
  HabitTitle,
  HabitEndDate,
  HabitExpiredText,
  DeleteButtonContainer,
} from "./Habit.style";

const Habit = ({ habitData, currentDate }) => {
  const inform = useInform();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");

  const serverEndDate = new Date(habitData.endDate);
  const localTimezoneOffset = 24 + serverEndDate.getTimezoneOffset() / 60; // 15

  const localEndDate = new Date(
    serverEndDate.setHours(serverEndDate.getHours() + localTimezoneOffset)
  );
  const fullYear = localEndDate.getFullYear();
  const fullMonth = localEndDate.getMonth() + 1;
  const fullDate = localEndDate.getDate();

  const isActive = localEndDate - currentDate >= 0;

  const ischeckedToday = habitData.dateList.find(({ date }) => {
    const limitDate = new Date(date);
    const currentTodayDate = new Date(currentDate);

    return limitDate.getDate() === currentTodayDate.getDate();
  }).isChecked;

  //dateList도 같이 넘겨줬으니까, 배열 안에서 현재 날짜보다 1 더한 일자의 isChecked 상태가 어떤지 확인하고 false, true여부

  const { mutate } = useMutation(habitApi.updateHabitStatus, {
    onSuccess: () => {
      //아니면 다른 screen으로 이동해서 랜덤으로 보여주게 해도 좋을 듯!
      inform({ message: "고양이의 상태가 변화되었습니다..." });
    },
    onError: (error) => {
      inform({ message: error.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["habitList", userInfo.user.id]);
    },
  });

  const handleHabitContainerClick = () => {
    mutate({ habitId: habitData.id, userId: userInfo.user.id });
  };

  return (
    <HabitContentContainer onPress={handleHabitContainerClick}>
      <HabitTextContainer>
        <HabitTitle style={{
          color: ischeckedToday ? "#e36387" : "#000000",
          textDecorationLine: ischeckedToday ? "line-through" : "none",
          textShadowColor: ischeckedToday ? "#f2aaaa" : "#ffffff",
          textShadowRadius: ischeckedToday ? 10 : 0,
        }}>
          {habitData.title}
        </HabitTitle>
        {isActive ? (
          <HabitEndDate>
            종료: {fullYear}년 {fullMonth}월 {fullDate}일 00시
          </HabitEndDate>
        ) : (
          <HabitExpiredText>습관 만들기 종료!</HabitExpiredText>
        )}
      </HabitTextContainer>
      <HabitCatImage source={{ uri: habitData.catImage }} />
      <HabitStatusContainer>
        <HabitStatusImage source={require("../../../asset/image/status.png")} />
        <HabitStatusText>X {habitData.status}</HabitStatusText>
      </HabitStatusContainer>
      {isActive ? (
        <DeleteButtonContainer>
          <Feather
            name="x"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Delete", { habitData });
            }}
          />
        </DeleteButtonContainer>
      ) : null}
    </HabitContentContainer>
  );
};

Habit.propTypes = {
  habitData: PropTypes.shape({
    endDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    catImage: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  }),
  currentDate: PropTypes.object.isRequired,
};

export default Habit;
