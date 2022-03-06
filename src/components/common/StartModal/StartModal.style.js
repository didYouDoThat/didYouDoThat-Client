import styled from "@emotion/native";

export const StartModalContentContainer = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StartModalContent = styled.View`
  position: relative;
  width: 80%;
  height: 60%;
  border-radius: 20px;
  background-color: #f0e1e1;
`;

export const StartModalTitle = styled.Text`
  margin: 60px 0 10px;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 27px;
  text-align: center;
`;

export const StartModalHabitListContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
`;

export const StartModalHabitListContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin-top: 10px;
`;

export const StartModalHabitListImage = styled.Image`
  width: 50px;
  height: 40px;
  margin-right: 10px;
`;

export const StartModalHabitListText = styled.Text`
  margin-right: 30px;
  margin-left: 5px;
  font-family: ${(props) => props.theme.subFont};
  font-size: 21px;
`;

export const CancelButtonContainer = styled.View`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const NotSeeingButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
  align-items: center;
`;
