import styled from "@emotion/native";

export const CheckHabitTitle = styled.Text`
  margin-bottom: 20px;
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.mainStrongColor};
  font-size: 30px;
  text-align: center;
`;

export const CheckHabitDateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;

export const CheckHabitDate = styled.Text`
  margin-right: 20px; 
  font-family: ${(props) => props.theme.subFont};
  font-size: 19px;
`;

export const CheckHabitStatusImage = styled.Image`
  width: 30px;
  height: 30px;
`;
