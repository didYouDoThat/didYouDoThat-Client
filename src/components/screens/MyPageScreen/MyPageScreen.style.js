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
  font-family: "DungGeunMo";
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
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: ${(props) =>
    props.isSuccessClicked ? "rgba(255, 255, 255, 0.5)" : ""};
`;

export const MyPageResultHabitListContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;
