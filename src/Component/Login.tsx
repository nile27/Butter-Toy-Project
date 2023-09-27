import styled from "styled-components";
import { setCookie } from "../Util/cookis";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LoginInput } from "../Style/StyleInput";
import { LoginBtn } from "../Style/StyleBtn";
import { isLoginModal } from "../atoms/IsModal";
import { isLoginAtom } from "../atoms/IsLogin";
import { expiresTime } from "../atoms/ExpiresTime";
import axios from "axios";

interface SignInObj {
  signBtn: boolean;
  setSignBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginObj {
  id: string;
  password: string;
}

const BtnDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const MiddleLine = styled.div`
  color: white;
  font-size: 24px;
  margin: 0 2rem;
`;

const LoginForm = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
`;

export function Login({ signBtn, setSignBtn }: SignInObj) {
  const [isModal, setIsModal] = useRecoilState<boolean>(isLoginModal);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginAtom);
  const setTime = useSetRecoilState<number>(expiresTime);
  const [loginForm, setLoginForm] = useState<LoginObj>({
    id: "",
    password: "",
  });

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm({ ...loginForm, [key]: e.target.value });
    };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      loginFunc();
    }
  };

  const idRegEx = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,15}$/;
  const loginFunc = () => {
    const expiresTime = new Date();
    if (idRegEx.test(loginForm.id)) {
      alert("ID는 6 ~ 15글자 입니다.");
      return;
    }

    if (!loginForm.id || !loginForm.password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    return axios
      .post(
        "/api/v1/assignment/sign-in",
        {
          id: loginForm.id,
          password: loginForm.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setCookie(
          "accessToken",
          res.data.result.accessToken,
          res.data.result.accessTokenExpiresIn
        );
        setCookie(
          "refreshToken",
          res.data.result.refreshToken,
          res.data.result.accessTokenExpiresIn
        );
        setCookie(
          "grantType",
          res.data.result.grantType,
          res.data.result.accessTokenExpiresIn
        );
        alert(res.data.message);
        setIsLogin(!isLogin);
        setIsModal(!isModal);
        setTime(res.data.result.accessTokenExpiresIn - expiresTime.getTime());
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert(err.response.data.message);
        }
        if (err.response.status === 401) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <>
      <LoginForm>
        <LoginInput onChange={handleInputValue("id")} />
        <LoginInput
          type="password"
          autoComplete="off"
          onChange={handleInputValue("password")}
          onKeyDown={(e) => handleKeyPress(e)}
        />
      </LoginForm>

      <BtnDiv>
        <LoginBtn onClick={() => setSignBtn(!signBtn)}>Sign in</LoginBtn>
        <MiddleLine>|</MiddleLine>
        <LoginBtn onClick={() => loginFunc()}>Sign up</LoginBtn>
      </BtnDiv>
    </>
  );
}
