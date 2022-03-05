import styled from "@emotion/native";

export const EndHabitScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.isCompleted ? "#e36387" : "#ddf3f5"};
`;

export const EndHabitContent = styled.View`
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50%;
  margin-bottom: 50px;
  border-radius: 20px;
  background-color: #ffffff;
`;

export const EndHabitTitle = styled.Text`
  margin-bottom: 20px;
  font-family: "DungGeunMo";
  font-size: 25px;
`;

export const EndHabitText = styled.Text`
  width: 80%;
  font-family: "DosGothic";
  font-size: 18px;
  text-align: center;
`;

export const EndHabitImageContainer = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin-top: 10px;
  padding-bottom: 20px;
`;

export const EndHabitCatImage = styled.Image`
  width: 160px;
  height: 130px;
`;

export const EndHabitResultTextImage = styled.Image`
  width: 130px;
  height: 100px;
  margin-bottom: -5px;
`;

export const EndHabitStampImage = styled.Image`
  position: absolute;
  right: 10px;
  bottom: 5px;
  width: 70px;
  height: 70px;
`;
