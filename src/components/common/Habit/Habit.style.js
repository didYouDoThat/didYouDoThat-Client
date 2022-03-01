import styled from "@emotion/native";

export const HabitContentContainer = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
position: relative;
justify-content: space-between;
width: 90%;
height: 100px;
margin: 20px auto 0;
padding: 0 10px 0 20px;
border-radius: 10px;
background-color: #ffffff;
`;

export const HabitTextContainer = styled.View`
/* 체크되면 전체 줄 그어지기 */
width: 60%;
`;

export const HabitCatImage = styled.Image`
width: 70px;
height: 70px;
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
height: 60px;
overflow: visible;
font-size: 21px;
font-family: "DosGothic";
`;

export const HabitEndDate = styled.Text`
font-size: 16px;
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
