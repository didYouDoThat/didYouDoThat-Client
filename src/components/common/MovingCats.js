import React from "react";
import styled from "@emotion/native";

const CatImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const MovingCats = () => {
  return (
    <Container>
      <CatImage source={require("../../asset/image/loginCats/b1_4.png")} />
      <CatImage source={require("../../asset/image/loginCats/g1_4.png")} />
      <CatImage source={require("../../asset/image/loginCats/w1_4.png")} />
    </Container>
  );
};

export default MovingCats;
