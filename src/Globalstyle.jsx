import { createGlobalStyle } from "styled-components";
import Victorian from "./font/Victorian.otf";

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: Victorian;
  font-weight: 400;
  src: url(${Victorian}) format("truetype");
}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    font-family: Pretendard;
    background: transparent;
    color: black;
  }
  
  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
  body{
    background-color: hsla(222, 16%, 16%, 1);
  }


  li{
    list-style: none;
  }

  :root {
    --white: hsl(0,0%,100%);
    --navi-btn-color: hsla(222, 6%, 46%, 1);
    --span-art-color: hsla(0, 0%, 74%, 1);
    --disable-tap-color: hsla(0, 0%, 45%, 1);
    --view-more-color: hsla(0, 0%, 88%, 1);
    --bg-blue-color:hsla(222, 16%, 16%, 1);
    
  }
`;

export default GlobalStyles;
