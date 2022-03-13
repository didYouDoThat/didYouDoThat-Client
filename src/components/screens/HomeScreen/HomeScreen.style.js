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

export const AboutButtonContainer = styled.Pressable`
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 10px;
  border-width: 3px;
  border-color: ${(props) => props.theme.subStrongColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainStrongColor};
`;

export const AboutButtonImage = styled.Image`
  width: 30px;
  height: 30px;
`;
