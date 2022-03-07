import styled from "@emotion/native";

export const HeaderTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;

export const HeaderImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const HeaderText = styled.Text`
  font-size: 25px;
  font-family: ${(props) => props.theme.mainFont};
`;
