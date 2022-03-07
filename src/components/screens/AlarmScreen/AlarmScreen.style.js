import styled from "@emotion/native";

export const AlarmScreenContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const AlarmTitle = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  font-size: 35px;
`;

export const AlarmNoticeText = styled.Text`
  width: 80%;
  margin: 20px 0 10px;
  font-family: ${(props) => props.theme.subFont};
  font-size: 18px;
  text-align: center;
`;

export const AlarmWarningText = styled.Text`
  margin: 20px 0 10px;
  font-family: ${(props) => props.theme.subFont};
  color: ${(props) => props.theme.mainStrongColor};
  font-size: 15px;
  text-align: center;
`;
