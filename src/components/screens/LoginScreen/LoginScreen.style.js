import styled from "@emotion/native";

export const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoginTitle = styled.Text`
  padding: 10px;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 55px;
`;

export const LoginSubTitle = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  font-size: 18px;
`;
