import styled from "@emotion/native";

export const StartHabitContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainColor};
`;

export const StartHabitTitle = styled.Text`
  width: 90%;
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.white};
  font-size: 40px;
  text-align: center;
`;

export const StartHabitImage = styled.Image`
  width: 100px;
  height: 100px;
`;

export const StartHabitHelloImage = styled.Image`
  width: 180px;
  height: 120px;
  margin-top: 10px;
  margin-bottom: -10px;
`;

export const StartHabitNoticeText = styled.Text`
  margin: 20px 0;
  font-family: ${(props) => props.theme.subFont};
  color: ${(props) => props.theme.black};
  font-size: 20px;
  text-align: center;
`;

export const StartHabitEndDate = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  color: ${(props) => props.theme.mainStrongColor};
`;
