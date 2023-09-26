import styled from "styled-components";
import { setCookie } from "../Util/cookis";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { LoginInput } from "../Style/StyleInput";
import { LoginBtn } from "../Style/StyleBtn";
import { isLoginModal } from "../atoms/IsModal";
import { isLoginAtom } from "../atoms/IsLogin";
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

  const loginFunc = () => {
    if (loginForm.id.length < 6 || loginForm.id.length > 15) {
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
        setCookie("accessToken", res.data.result.accessToken);
        setCookie("refreshToken", res.data.result.refreshToken);
        setCookie("grantType", res.data.result.grantType);
        alert(res.data.message);
        setIsLogin(!isLogin);
        setIsModal(!isModal);
      })
      .catch((err) => {
        console.log(err);
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
