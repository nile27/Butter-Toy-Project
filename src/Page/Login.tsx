import { useState } from "react";
import styled from "styled-components";
import { LoginInput } from "../Style/StyleInput";
import { LoginBtn, JoinBtn } from "../Style/StyleBtn";
import xbox from "../img/xbox.svg";
import SignUp from "./SignUp";
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
  padding: 1.5rem 3rem 2rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  position: relative;
  max-width: 500px;
  min-width: 350px;
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

const SignUpUl = styled.ul`
  width: 100%;
  height: auto;
  padding: 10px 0;
`;

const SignLi = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  > span {
    text-align: start;
    color: white;
    min-width: 80px;
    font-size: 18px;
    font-weight: 700;
    margin-right: 15%;
    white-space: nowrap;
  }
`;

export default function Login({ isModal, setIsModal }: ismodalOBJ) {
  const signArr = ["ID", "Password", "Re-Enter", "Name", "E-mail", "Mobile"];
  const [signBtn, setSignBtn] = useState<boolean>(false);
  const loginFunc = () => {
    setIsModal(!isModal);
  };

  return (
    <LoginBg>
      <LoginContainer>
        <h1>{signBtn ? "SignUp" : "Login"}</h1>
        <XBtn onClick={() => setIsModal(!isModal)}>
          <img src={xbox} alt={"X Button"} />
        </XBtn>
        {!signBtn ? (
          <>
            <LoginInput />
            <LoginInput />
            <BtnDiv>
              <LoginBtn onClick={() => loginFunc()}>Sign in</LoginBtn>
              <MiddleLine>|</MiddleLine>
              <LoginBtn onClick={() => setSignBtn(!signBtn)}>Sign up</LoginBtn>
            </BtnDiv>
          </>
        ) : (
          <>
            <SignUpUl>
              {signArr.map((item, idx) => {
                return (
                  <SignLi key={idx}>
                    <span>{item}</span>
                    <LoginInput />
                  </SignLi>
                );
              })}
            </SignUpUl>
            <BtnDiv>
              <JoinBtn>Join Us</JoinBtn>
            </BtnDiv>
          </>
        )}
      </LoginContainer>
    </LoginBg>
  );
}
