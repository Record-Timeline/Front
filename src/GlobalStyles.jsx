import React from "react";
import { createGlobalStyle } from "styled-components";
import Pretendard from "./assets/fonts/Pretendard-Regular.woff";

const GlobalStyle = createGlobalStyle`
@font-face { 
  font-family: "Pretendard";
  src: local('Pretendard Regular') url(${Pretendard}) format("woff");
}
* {
    font-family: 'Pretendard';
    margin: 0px;
}
`;

export default GlobalStyle;
