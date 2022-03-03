import styled from "@emotion/native";

export const ModalContainer = styled.View`
  flex: 1;
`;

export const ModalBackground = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContentContainer = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: ${(props) => props.width || "45%"};
  margin: auto;
  padding: 20px;
  border-radius: 20px;
  background-color: #ddf3f5;
`;

export const CancelButtonContainer = styled.View`
  position: absolute;
  top: 15px;
  right: 15px;
`;
