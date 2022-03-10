import styled from "@emotion/native";

export const HabitContentContainer = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  align-items: center;
  width: ${(props) => props.width || "90%"};
  height: 100px;
  margin: 20px auto 0;
  padding: 0 10px;
  border-left-width: 10px;
  border-color: #f3bda1;
  background-color: ${(props) => props.theme.white};
`;

export const HabitContentCheckedContainer = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const HabitTextContainer = styled.View`
  width: 60%;
  padding: 5px 0 15px;
`;

export const HabitCatImage = styled.Image`
  width: 80px;
  height: 65px;
  margin-right: 10px;
`;

export const HabitStatusContainer = styled.View`
  position: absolute;
  right: 15px;
  bottom: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const HabitStatusImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const HabitStatusText = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  font-size: 17px;
`;

export const HabitTitle = styled.Text`
  height: 60px;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 20px;
`;

export const HabitEndDate = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  font-size: 15px;
`;

export const HabitExpiredText = styled.Text`
  font-family: ${(props) => props.theme.subFont};
  color: #e36387;
`;
