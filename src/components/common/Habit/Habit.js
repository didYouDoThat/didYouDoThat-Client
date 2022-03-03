import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

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

const Habit = ({ habitData, currentDate }) => {
  const navigation = useNavigation();

  const serverEndDate = new Date(habitData.endDate);
  const localTimezoneOffset = 24 + serverEndDate.getTimezoneOffset() / 60; // 15

  const localEndDate = new Date(
    serverEndDate.setHours(serverEndDate.getHours() + localTimezoneOffset)
  );
  const fullYear = localEndDate.getFullYear();
  const fullMonth = localEndDate.getMonth() + 1;
  const fullDate = localEndDate.getDate();

  const isActive = localEndDate - currentDate >= 0;

  return (
    <HabitContentContainer
      onPress={() => {
        console.log("container!");
      }}
    >
      <HabitTextContainer>
        <HabitTitle>{habitData.title}</HabitTitle>
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
              console.log(habitData.id);
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
