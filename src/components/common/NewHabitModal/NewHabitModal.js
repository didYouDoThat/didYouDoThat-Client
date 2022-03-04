import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import {
  ModalContainer,
  ModalBackground,
  ModalContentContainer,
  CancelButtonContainer,
} from "./NewHabitModal.style";

const Modal = ({ contentHeight, children }) => {
  const navigation = useNavigation();

  const handleGoBackClick = () => {
    navigation.goBack();
  };

  return (
    <ModalContainer>
      <ModalBackground onPress={handleGoBackClick} />
      <ModalContentContainer width={contentHeight}>
        {children}
        <CancelButtonContainer>
          <Feather
            name="x"
            size={24}
            color="black"
            onPress={handleGoBackClick}
          />
        </CancelButtonContainer>
      </ModalContentContainer>
    </ModalContainer>
  );
};

Modal.propTypes = {
  contentHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
