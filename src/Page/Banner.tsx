import { bannerArr } from "../data/Banner_data";
import { FixBtn } from "../Style/StyleBtn";
import LoginPage from "./LoginPage";
import Hamburger from "../img/Hamburger.svg";
import { useState, useRef, useEffect } from "react";
import { useInterval } from "../hook/useInterval";
import styled from "styled-components";
import { isLoginModal } from "../atoms/IsModal";
import { useRecoilState } from "recoil";
import { api } from "../Util/Api";
import { getCookie, removeCookie } from "../Util/cookis";
import { isLoginAtom } from "../atoms/IsLogin";

const Container = styled.div`
  width: auto;
  height: auto;
  overflow: hidden;
`;

const BannerDiv = styled.div`
  width: 400vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  opacity: 0.4;
  background: black;
`;

const BannerImg = styled.img`
  width: 100vw;
  height: auto;
`;

const BackgroundBox = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2% 5%;

  > h1 {
    font-size: 48px;
    font-weight: 700;
    color: white;
    text-align: center;
  }
`;

const HamburgerBtn = styled.button`
  width: auto;
  height: auto;
  margin-left: 115px;
`;

const LogoDiv = styled.div`
  width: auto;
  height: 10rem;
  transform: rotate(-10deg);

  > span {
    color: #fff;
    text-align: center;
    font-family: Victorian;
    font-size: 7.4375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const BannerPageDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const PageDiv = styled.button<{ color: string }>`
  width: 3rem;
  height: 0.6rem;
  margin-right: 1rem;
  background: ${(props) => (props.color === "white" ? "white" : " #727272")};
`;

export default function Banner() {
  const [count, setCount] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [isModal, setIsModal] = useRecoilState<boolean>(isLoginModal);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const leng: number = bannerArr.length - 1;

  function nextScrollFunc() {
    if (count >= leng) {
      // 더 이상 넘어갈 슬라이드가 없으면
      setCount(0); // 1번째 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCount(count + 1);
    }
  }

  function Logout() {
    const access = getCookie("accessToken");
    const refresh = getCookie("refreshToken");

    return api
      .post("/api/v1/assignment/sign-out", {
        accessToken: access,
        refreshToken: refresh,
      })
      .then(() => {
        setIsLogin(!isLogin);
        removeCookie("aceessToken");
        removeCookie("refreshToken");
        removeCookie("grantType");
        alert("로그아웃이 되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useInterval(() => nextScrollFunc(), 3000);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 1s ease-in-out";
      slideRef.current.style.transform = `translateX(-${
        (100 / (leng + 1)) * count
      }%)`;
    }
  }, [count, leng]);

  return (
    <Container>
      <BackgroundBox>
        <HeaderDiv>
          <FixBtn color={"white"} onClick={() => setIsModal(!isModal)}>
            RESERVATION
          </FixBtn>
          <h1>BUTTER</h1>
          <HamburgerBtn onClick={() => Logout()}>
            <img src={Hamburger} alt={"HambergerBtn"} />
          </HamburgerBtn>
        </HeaderDiv>
        <LogoDiv>
          <span>For the high-end</span>
        </LogoDiv>
        <BannerPageDiv>
          {bannerArr.map((_, idx) => {
            return count === idx ? (
              <PageDiv
                color={"white"}
                key={idx}
                onClick={() => setCount(idx)}
              ></PageDiv>
            ) : (
              <PageDiv
                color={"none"}
                key={idx}
                onClick={() => setCount(idx)}
              ></PageDiv>
            );
          })}
        </BannerPageDiv>
      </BackgroundBox>
      {isModal ? <LoginPage /> : null}
      <BannerDiv ref={slideRef}>
        {bannerArr.map((item, idx) => {
          return <BannerImg src={item} key={idx} alt={`${idx}`} />;
        })}
      </BannerDiv>
    </Container>
  );
}
