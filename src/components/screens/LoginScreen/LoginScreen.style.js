import styled from "@emotion/native";

export const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoginTextContainer = styled.View`
  align-items: center;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  border-top-width: 5px;
  border-bottom-width: 5px;
  border-color: ${(props) => props.theme.subStrongColor};
  background-color: ${(props) => props.theme.extraStrongColor};
`;

export const LoginTitle = styled.Text`
  padding: 10px;
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.black};
  font-size: 55px;
`;

export const LoginSubTitle = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  color: ${(props) => props.theme.black};
  font-size: 18px;
`;
