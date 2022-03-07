import styled from "@emotion/native";

export const HomeScreenContainer = styled.View`
  flex: 1;
`;

export const DateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.subStrongColor};
`;

export const DateText = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.white};
  font-size: 20px;
`;

export const HabitsContainer = styled.ScrollView`
  flex: 10;
`;
