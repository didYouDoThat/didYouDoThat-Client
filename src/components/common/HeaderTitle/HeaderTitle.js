import React from "react";

import {
  HeaderTitleContainer,
  HeaderText,
  HeaderImage,
} from "./HeaderTitle.style";

const HeaderTitle = () => {
  return (
    <HeaderTitleContainer>
      <HeaderText>그거했냥</HeaderText>
      <HeaderImage source={require("../../../asset/image/headerLogo.png")} />
    </HeaderTitleContainer>
  );
};

export default HeaderTitle;
