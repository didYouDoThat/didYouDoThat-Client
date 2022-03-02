import styled from "@emotion/native";

export const NewHabitContainer = styled.View`
  flex: 1;
`;

export const NewHabitBackground = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const NewHabitContent = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 45%;
  margin: auto;
  padding: 20px;
  border-radius: 20px;
  background-color: #ddf3f5;
`;

export const NewHabitTitle = styled.Text`
  width: 100%;
  font-family: "DungGeunMo";
  font-size: 33px;
  text-align: center;
`;

export const InputTitleError = styled.Text`
  font-family: "DosGothic";
  color: red;
`;

export const NewHabitInput = styled.TextInput`
  width: 90%;
  height: 40px;
  margin: 15px 0;
  padding: 0 10px;
  background-color: #ffffff;
  font-family: "DosGothic";
`;

export const NewHabitNoticeContainer = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const NewHabitNoticeText = styled.Text`
  width: 90%;
  font-family: "DosGothic";
  color: #e36387;
  font-size: 13px;
  text-align: center;
`;

export const NewHabitDisableTitle = styled.Text`
  margin-bottom: 20px;
  font-family: "DungGeunMo";
  font-size: 30px;
  text-align: center;
`;

export const NewHabitDisableText = styled.Text`
  font-family: "DosGothic";
  font-size: 20px;
  text-align: center;
`;

export const NewHabitDisableImage = styled.Image`
  width: 50%;
  height: 100px;
  margin-top: 20px;
`;

export const CancelNewHabitButtonContainer = styled.View`
  position: absolute;
  top: 15px;
  right: 15px;
`;
