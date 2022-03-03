import styled from "@emotion/native";

export const HabitContentContainer = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 100px;
  margin: 20px auto 0;
  padding: 0 10px 0 20px;
  border-radius: 10px;
  background-color: #ffffff;
`;

export const HabitContentCheckedContainer = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const HabitTextContainer = styled.View`
  width: 60%;
`;

export const HabitCatImage = styled.Image`
  width: 80px;
  height: 65px;
  margin-right: 70px;
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
  font-size: 17px;
  font-family: "DosGothic";
`;

export const HabitTitle = styled.Text`
  width: 230px;
  height: 60px;
  font-family: "DungGeunMo";
  font-size: 22px;
`;

export const HabitEndDate = styled.Text`
  font-size: 15px;
  font-family: "DosGothic";
`;

export const HabitExpiredText = styled.Text`
  color: #e36387;
  font-family: "DosGothic";
`;

export const DeleteButtonContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
`;
