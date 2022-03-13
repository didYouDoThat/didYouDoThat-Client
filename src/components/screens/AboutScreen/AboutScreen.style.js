import styled from "@emotion/native";

export const AboutContentContainer = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  width: ${(props) => props.width};
`;

export const AboutContentTitle = styled.Text`
  margin-top: 30px;
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.mainStrongColor};
  font-size: 25px;
  text-align: center;
`;

export const AboutContentExplanation = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  font-size: 15px;
`;

export const AboutContentImage = styled.Image`
  width: 100px;
  height: 100px;
`;
