import styled from "@emotion/native";

export const MyPageScreenContainter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
`;

export const MyPageUserInfoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MyPageUserNameText = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  font-size: 22px;
`;

export const MyPageButtonContainer = styled.View`
  flex-direction: row;
`;

export const MyPageResultContainer = styled.View`
  flex: 5;
  width: 100%;
`;

export const MyPageResultTabContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 10%;
`;

export const MyPageResultTabButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: ${(props) =>
    props.isSuccessClicked ? "rgba(255, 255, 255, 0.5)" : ""};
`;

export const MyPageResultTabImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const MyPageResultTabText = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  font-size: 18px;
`;

export const MyPageResultHabitListContainer = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px 0 60px 0;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const MyPageScrollTopButtonContainer = styled.Pressable`
  position: absolute;
  right: 30px;
  bottom: 80px;
  padding: 10px;
  border-radius: 10px;
  border-width: 3px;
  border-color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.deepColor};
`;

export const MyPageScrollTopImage = styled.Image`
  width: 30px;
  height: 30px;
`;
