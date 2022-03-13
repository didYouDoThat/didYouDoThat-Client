import styled from "@emotion/native";

export const SwipeBoxContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-top: 20px;
  background-color: ${(props) => props.color};
`;
