import styled from "styled-components";
import { setCookie, getCookie } from "../Util/cookis";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { LoginInput } from "../Style/StyleInput";
import { LoginBtn } from "../Style/StyleBtn";
import { isLoginModal } from "../atoms/IsModal";
import { api } from "../Util/Api";

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

export function Login({ signBtn, setSignBtn }: SignInObj) {
  const [isModal, setIsModal] = useRecoilState<boolean>(isLoginModal);
  const [loginForm, setLoginForm] = useState<LoginObj>({
    id: "",
    password: "",
  });

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm({ ...loginForm, [key]: e.target.value });
    };

  const loginFunc = () => {
    if (loginForm.id.length < 6 || loginForm.id.length > 15) {
      alert("ID는 6글자 이상, 15글자 이하입니다.");
      return;
    }

    if (!loginForm.id || !loginForm.password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    return api
      .post(
        "/api/v1/assignment/sign-in",
        {
          id: loginForm.id,
          password: loginForm.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setCookie("accessToken", res.data.result.accessToken);
        setCookie("refreshToken", res.data.result.refreshToken);
        setCookie("grantType", res.data.result.grantType);
        alert(res.data.message);

        setIsModal(!isModal);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert(err.response.data.message);
        }
        if (err.response.status === 500) {
          alert("비밀번호를 확인해주세요.");
        }
      });
  };
  return (
    <>
      <LoginInput onChange={handleInputValue("id")} />
      <LoginInput type="password" onChange={handleInputValue("password")} />
      <BtnDiv>
        <LoginBtn onClick={() => setSignBtn(!signBtn)}>Sign in</LoginBtn>
        <MiddleLine>|</MiddleLine>
        <LoginBtn onClick={() => loginFunc()}>Sign up</LoginBtn>
      </BtnDiv>
    </>
  );
}
