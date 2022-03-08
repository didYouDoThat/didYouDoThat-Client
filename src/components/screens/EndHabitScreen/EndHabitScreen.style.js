import styled from "@emotion/native";

export const EndHabitScreenContainer = styled.View`
  flex: 1;
`;

export const EndHabitContent = styled.View`
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  margin-bottom: 50px;
  border-width: 5px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.white};
`;

export const EndHabitTitle = styled.Text`
  margin-bottom: 40px;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 35px;
`;

export const EndHabitText = styled.Text`
  width: 80%;
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.subFont};
  font-size: 18px;
  text-align: center;
`;

export const EndHabitImageContainer = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 10px;
  padding-bottom: 20px;
`;

export const EndHabitCatImage = styled.Image`
  width: 170px;
  height: 140px;
`;

export const EndHabitResultTextImage = styled.Image`
  width: 140px;
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

export const EndhabitBackground = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const EndHabitButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) =>
    props.isCompleted ? props.theme.deepStrongColor : props.theme.deepColor};
`;
