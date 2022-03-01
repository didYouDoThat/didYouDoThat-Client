import React from "react";

import styled from "@emotion/native";

const HeaderTitleContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
  align-items: center;
`;

const HeaderImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const HeaderText = styled.Text`
  font-size: 25px;
  font-family: "DosGothic";
`;

const HeaderTitle = () => {
  return (
    <HeaderTitleContainer>
      <HeaderText>그거했냥</HeaderText>
      <HeaderImage source={require("../../asset/image/loading.png")} />
    </HeaderTitleContainer>
  );
};

export default HeaderTitle;
