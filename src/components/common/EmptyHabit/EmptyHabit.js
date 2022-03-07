import React from "react";

import {
  EmptyHabitContainer,
  EmptyHabitImage,
  EmptyHabitTitle,
  EmptyHabitText,
} from "./EmptyHabit.style";

const EmptyHabit = () => {
  return (
    <EmptyHabitContainer>
      <EmptyHabitImage
        source={require("../../../asset/image/emptyImage.png")}
      />
      <EmptyHabitTitle>거창하지 않아도 좋아요</EmptyHabitTitle>
      <EmptyHabitText>
        일주일동안 만들 수 있는 습관을 길러봅시다!!
      </EmptyHabitText>
    </EmptyHabitContainer>
  );
};

export default EmptyHabit;
