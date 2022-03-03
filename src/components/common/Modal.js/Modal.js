import React from "react";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import {
  ModalContainer,
  ModalBackground,
  ModalContentContainer,
  CancelButtonContainer,
} from "./Modal.style";

const Modal = ({ navigation, contentHeight, children }) => {
  const handleGoBackClick = () => {
    navigation.goBack();
  };

  return (
    <ModalContainer>
      <ModalBackground onPress={handleGoBackClick}/>
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

Modal.PropTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  contentHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
