import styled from "@emotion/native";

export const LoadingContainer = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

export const LoadingImageContainer = styled.View`
flex-direction: row;
height: 70px;
`;

export const LoadingImage = styled.Image`
width: 70px;
height: 70px;
padding: 0 20px;
`;

export const LoadingTitle = styled.Text`
font-size: 30px;
font-family: ${(props) => props.theme.subFont};
`;
