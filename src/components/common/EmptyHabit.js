import React from "react";

import styled from "@emotion/native";

const EmptyHabitContainer = styled.View`
  align-items: center;
  width: 90%;
  margin: auto;
`;

const EmptyHabitImage = styled.Image`
  width: 160px;
  height: 150px;
  margin: 20px;
`;

const EmptyHabitTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 25px;
  font-family: "DosGothic";
`;

const EmptyHabitText = styled.Text`
  font-size: 16px;
  font-family: "DosGothic";
`;

const EmptyHabit = () => {
  return (
    <EmptyHabitContainer>
      <EmptyHabitImage source={require("../../asset/image/noHabit.png")} />
      <EmptyHabitTitle>
        "길지 않아도 좋아요"
      </EmptyHabitTitle>
      <EmptyHabitText>
        일주일동안 만들 수 있는 습관을 길러봅시다!!
      </EmptyHabitText>
    </EmptyHabitContainer>
  );
};

export default EmptyHabit;
