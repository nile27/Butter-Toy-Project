import { LoginInput } from "../Style/StyleInput";
import { JoinBtn } from "../Style/StyleBtn";
import { isLoginModal } from "../atoms/IsModal";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

interface SiginObj {
  userId: string;
  password: string;
  userName: string;
  email: string;
  mobile: string;
}

interface SiginFrontDataObj {
  frontName: string;
  DataName: string | null;
  type: string;
}

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

const BtnDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-item: center;
`;
export function SignIn() {
  const [isModal, setIsModal] = useRecoilState(isLoginModal);
  const [signData, setSignData] = useState<SiginObj>({
    userId: "",
    password: "",
    userName: "",
    email: "",
    mobile: "",
  });
  const [reEnter, setReEnter] = useState<string>("");
  const signArr: SiginFrontDataObj[] = [
    { frontName: "ID", DataName: "userId", type: "default" },
    { frontName: "Password", DataName: "password", type: "password" },
    { frontName: "Re-Enter", DataName: null, type: "password" },
    {
      frontName: "Name",
      DataName: "userName",
      type: "default",
    },
    {
      frontName: "E-mail",
      DataName: "email",
      type: "default",
    },
    {
      frontName: "Mobile",
      DataName: "mobile",
      type: "default",
    },
  ];

  const idRegEx = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,15}$/;
  const emailRegEx = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  const phoneRegEx = /^01([0|1|6|7|8|9])-(\d{3}|\d{4})-\d{4}$/;

  function signInFunc() {
    const phoneNum =
      signData.mobile.slice(0, 3) +
      "-" +
      signData.mobile.slice(3, 7) +
      "-" +
      signData.mobile.slice(7, signData.mobile.length);
    console.log(phoneNum);
    if (!idRegEx.test(signData.userId)) {
      alert("ID는 영문 숫자 포함 6이상 15이하입니다.");
      return;
    }
    if (reEnter !== signData.password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!emailRegEx.test(signData.email)) {
      alert("이메일 양식에 맞게 작성해주세요.");
      return;
    }
    if (!phoneRegEx.test(phoneNum)) {
      alert("올바른 핸드폰 번호를 입력해주세요.");
      return;
    }

    if (
      !signData.password ||
      !signData.userName ||
      !signData.email ||
      !signData.mobile ||
      !signData.userId
    ) {
      alert("모든 항목을 작성해주세요.");
      return;
    } else {
      return axios
        .post(
          `/api/v1/assignment/sign-up`,
          {
            userId: signData.userId,
            password: signData.password,
            userName: signData.userName,
            email: signData.email,
            mobile: signData.mobile,
          },
          { withCredentials: true }
        )
        .then(() => {
          alert("회원가입이 완료 되었습니다.");
          setIsModal(!isModal);
        })
        .catch((err) => {
          if (err.response.status === 409) {
            alert(err.response.data.message);
          }
        });
    }
  }

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignData({ ...signData, [key]: e.target.value });
    };

  return (
    <>
      <SignUpUl>
        <form>
          {signArr.map((item, idx) => {
            return item.DataName !== null ? (
              <SignLi key={idx}>
                <span>{item.frontName}</span>

                <LoginInput
                  type={item.type}
                  onChange={handleInputValue(item.DataName)}
                  autoComplete="off"
                />
              </SignLi>
            ) : (
              <SignLi key={idx}>
                <span>{item.frontName}</span>
                <LoginInput
                  type={item.type}
                  onChange={(e) => setReEnter(e.target.value)}
                  autoComplete="off"
                />
              </SignLi>
            );
          })}
        </form>
      </SignUpUl>
      <BtnDiv>
        <JoinBtn onClick={() => signInFunc()}>Join Us</JoinBtn>
      </BtnDiv>
    </>
  );
}
