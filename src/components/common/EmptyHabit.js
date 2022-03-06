import React from "react";

import styled from "@emotion/native";

const EmptyHabitContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 80px auto;
`;

const EmptyHabitImage = styled.Image`
  width: 170px;
  height: 160px;
  margin: 20px;
`;

const EmptyHabitTitle = styled.Text`
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 25px;
`;

const EmptyHabitText = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  font-size: 16px;
`;

const EmptyHabit = () => {
  return (
    <EmptyHabitContainer>
      <EmptyHabitImage source={require("../../asset/image/cheese.png")} />
      <EmptyHabitTitle>길지 않아도 좋아요</EmptyHabitTitle>
      <EmptyHabitText>
        일주일동안 만들 수 있는 습관을 길러봅시다!!
      </EmptyHabitText>
    </EmptyHabitContainer>
  );
};

export default EmptyHabit;
