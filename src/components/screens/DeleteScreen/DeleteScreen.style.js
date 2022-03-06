import styled from "@emotion/native";

export const DeleteHabitTitleContainer = styled.Text`
  margin-top: 15px;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 28px;
  text-align: center;
`;

export const DeleteHabitTitle = styled.Text`
  color: ${(props) => props.theme.mainStrongColor};
`;

export const DeleteHabitText = styled.Text`
  margin: 15px 0 5px;
  font-family: ${(props) => props.theme.subFont};
  font-size: 16px;
  text-align: center;
`;
