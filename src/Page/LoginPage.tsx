import xbox from "../img/xbox.svg";
import { Login } from "../Component/Login";
import { SignIn } from "../Component/SignIn";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { isLoginModal } from "../atoms/IsModal";
import { useRecoilState } from "recoil";

const LoginBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 100;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LoginContainer = styled.div`
  width: 40%;
  height: auto;
  position: absolute;

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

const XBtn = styled.button`
  width: auto;
  height: auto;
  position: absolute;
  top: 15px;
  right: 2%;
`;

export default function LoginPage() {
  const [signBtn, setSignBtn] = useState<boolean>(false);

  const [isModal, setIsModal] = useRecoilState<boolean>(isLoginModal);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModal]);

  return (
    <>
      <LoginBg>
        <LoginContainer>
          <h1>{signBtn ? "SignUp" : "Login"}</h1>
          <XBtn onClick={() => setIsModal(!isModal)}>
            <img src={xbox} alt={"X Button"} />
          </XBtn>
          {!signBtn ? (
            <Login signBtn={signBtn} setSignBtn={setSignBtn} />
          ) : (
            <SignIn />
          )}
        </LoginContainer>
      </LoginBg>
    </>
  );
}
