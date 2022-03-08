import styled from "@emotion/native";

export const LoginContainer = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoginTextContainer = styled.View`
  align-items: center;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  border-top-width: 20px;
  border-bottom-width: 20px;
  border-color: ${(props) => props.theme.extraStrongColor};
  background-color: ${(props) => props.theme.subStrongColor};
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
