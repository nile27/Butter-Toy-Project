import { useState } from "react";
import styled from "styled-components";
import { LoginInput } from "../Style/StyleInput";
import { LoginBtn } from "../Style/StyleBtn";
import xbox from "../img/xbox.svg";
interface ismodalOBJ {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginBg = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 40%;
  height: auto;
  background: #2d2d2d;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  position: relative;
  max-width: 500px;
  min-width: 300px;
  > h1 {
    font-size: 28px;
    color: white;
    font-weight: 700;
  }
`;

const BtnDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const XBtn = styled.button`
  width: auto;
  height: auto;
  position: absolute;
  top: 5%;
  right: 2%;
`;

const MiddleLine = styled.div`
  color: white;
  font-size: 24px;
  margin: 0 2rem;
`;

export default function Login({ isModal, setIsModal }: ismodalOBJ) {
  const loginFunc = () => {
    setIsModal(!isModal);
  };

  return (
    <LoginBg>
      <LoginContainer>
        <h1>Login</h1>
        <XBtn onClick={() => setIsModal(!isModal)}>
          <img src={xbox} alt={"X Button"} />
        </XBtn>
        <LoginInput></LoginInput>
        <LoginInput></LoginInput>
        <BtnDiv>
          <LoginBtn onClick={() => loginFunc()}>Sign in</LoginBtn>
          <MiddleLine>|</MiddleLine>
          <LoginBtn>Sign up</LoginBtn>
        </BtnDiv>
      </LoginContainer>
    </LoginBg>
  );
}
