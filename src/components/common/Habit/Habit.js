import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import useGetDateInfo from "../../../utils/useGetDateInfo";
import changeServerEndDateIntoLocalDate from "../../../utils/changeServerDateIntoLocalDate";
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
  DeleteButtonContainer,
} from "./Habit.style";

const Habit = ({ habitData, currentDate, isInMyPage, width }) => {
  const inform = useInform();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");

  const localEndDate = changeServerEndDateIntoLocalDate(habitData.endDate);
  const [fullYear, fullMonth, fullDate] = useGetDateInfo(localEndDate);

  const isActive = localEndDate - currentDate >= 0;

  const ischeckedToday = habitData.dateList.find(({ date }) => {
    const limitDate = changeServerEndDateIntoLocalDate(date);
    const currentTodayDate = new Date(currentDate);

    return limitDate.getDate() - 1 === currentTodayDate.getDate();
  })?.isChecked;

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
    <HabitContentContainer
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
      <HabitTextContainer>
        <HabitTitle
          style={{
            color: ischeckedToday ? "#e36387" : "#000000",
            textDecorationLine: ischeckedToday ? "line-through" : "none",
            textShadowColor: ischeckedToday ? "#f2aaaa" : "#ffffff",
            textShadowRadius: ischeckedToday ? 5 : 0,
          }}
        >
          {habitData.title}
        </HabitTitle>
        {isActive ? (
          <HabitEndDate>
            종료: {fullYear}년 {fullMonth}월 {fullDate}일 00시
          </HabitEndDate>
        ) : !isInMyPage ? (
          <HabitExpiredText>습관 만들기 종료!</HabitExpiredText>
        ) : null}
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
    dateList: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    catImage: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  }),
  currentDate: PropTypes.object.isRequired,
  isInMyPage: PropTypes.bool,
  width: PropTypes.string,
};

export default Habit;
