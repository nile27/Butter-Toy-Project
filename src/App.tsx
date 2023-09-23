import React, { useEffect } from "react";
import Banner from "./Page/Banner";
import GlobalStyles from "./Globalstyle";
import styled from "styled-components";
import { NormalBtn, FixBtn, LoginBtn, JoinBtn } from "./Style/StyleBtn";
import { LoginInput } from "./Style/StyleInput";

const Div = styled.div`
  background-color: black;
  color: #ffffff;
  font-size: 100px;
  font-weight: 100;
  width: 50%;
  padding: 20px;
`;

function App() {
  // useEffect(() => {
  //   axios
  //     .get("https://assignment.dev.buttercorp.kr/api/v1/assignment/get-info")
  //     .then((res) => console.log(res.data));
  // }, []);
  return (
    <>
      <GlobalStyles />
      <div className="container">
        <NormalBtn>HIGH-END CAR STORE</NormalBtn>
        <FixBtn color={"asd"}>HIGH-END CAR STORE</FixBtn>
        <JoinBtn>Sign in</JoinBtn>
        <Div>
          <LoginInput />
        </Div>
      </div>
    </>
  );
}

export default App;
