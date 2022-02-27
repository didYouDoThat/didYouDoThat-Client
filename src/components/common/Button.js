import styled from "@emotion/native";
import { TouchableOpacity, Text } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  /* background-color: #f2aaaa; */
  background-color: ${(props) => props.color || "#f2aaaa"};
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
`;

const CustomButton = ({ color, title, onPress }) => {
  return (
    <ButtonContainer
      color={color}
      onPress={onPress}
    >
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;