import styled from "@emotion/native";

export const EmptyHabitContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 80px auto;
`;

export const EmptyHabitImage = styled.Image`
  width: 160px;
  height: 140px;
  margin: 20px;
`;

export const EmptyHabitTitle = styled.Text`
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 25px;
`;

export const EmptyHabitText = styled.Text`
  width: 90%;
  font-family: ${(props) => props.theme.subFont};
  font-size: 16px;
  text-align: center;
`;
