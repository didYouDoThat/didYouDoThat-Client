import React, { useState } from "react";
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
  const localEndDate = new Date(habitData.endDate);
  const fullYear = localEndDate.getFullYear();
  const fullMonth = localEndDate.getMonth() + 1;
  const fullDate = localEndDate.getDate();

  const [isActive, ] = useState(localEndDate - currentDate >= 0);

  return (
    <HabitContentContainer onPress={() => {
      console.log("container!");
    }}>
      <HabitTextContainer>
        <HabitTitle>{habitData.title}</HabitTitle>
        {isActive ? (
          <HabitEndDate>
            종료일: {fullYear}년 {fullMonth}월 {fullDate}일
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
      <DeleteButtonContainer>
        <Feather
          name="x"
          size={24}
          color="black"
          onPress={() => {
            isActive ? console.log("active!!!") : console.log("end!!!!!!");
          }}
        />
      </DeleteButtonContainer>
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
