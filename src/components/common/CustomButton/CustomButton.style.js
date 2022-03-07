import styled from "@emotion/native";

export const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "250px"};
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color || props.theme.subStrongColor};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.white};
  font-size: 20px;
  font-family: ${(props) => props.theme.mainFont};
`;
