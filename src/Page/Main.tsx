import { NormalBtn, FixBtn } from "../Style/StyleBtn";
import img5 from "../img/image 5.svg";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5vh 0;
  gap: 15%;
`;

const NaviContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 10%;
  align-items: center;
  padding: 0 18%;
`;

const BodyContainer = styled.div`
  width: 90%;
  height: auto;
  max-height: 80%;
  display: flex;
  justify-content: flex-end;
  position: relative;

  > img {
    width: 70%;
    min-width: 700px;
  }

  @media screen and (min-width: 800px) and (max-width: 1300px) {
    width: 100%;
    > img {
      width: 100%;

      opacity: 0.5;
    }
  }

  @media screen and (max-width: 800px) {
    width: 90%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    > img {
      width: 100%;
    }
  }
`;

const ArticleDiv = styled.div`
  max-width: 1500px;
  min-width: 700px;
  width: 50%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  top: 10%;
  left: 5%;
  flex-wrap: wrap;
  > span {
    width: 80%;
    font-size: 5vw;
    font-weight: 100;
    white-space: pre-wrap;
    color: white;
  }
  @media screen and (min-width: 800px) and (max-width: 1300px) {
    position: absolute;
    z-index: 100;
    > span {
      font-size: 50px;
      width: 60%;
    }
  }

  @media screen and (max-width: 800px) {
    position: static;
    z-index: 0;
    height: auto;
    > span {
      font-size: 50px;
      white-space: nowrap;
    }
  }
`;

const PDiv = styled.div`
  width: 80%;

  > p {
    font-size: 20px;
    color: #bdbdbd;
    white-space: pre-wrap;
  }
`;

const ViewDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
  jutify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  bottom: 5%;
  left: 5%;

  @media screen and (max-width: 800px) {
    position: static;
    width: 100%;
  }
`;

// position: absolute;
// z-index: 110;
// top: 30%;
// left: 10%;

export default function Main() {
  const [naviIdx, setNaviIdx] = useState<number>(0);
  const naviArr: string[] = [
    "High-end Car",
    "MAINENANCE",
    "TUNNING CAR",
    "BODY PAINT",
  ];
  return (
    <Container>
      <NaviContainer>
        {naviArr.map((item, idx) => {
          return naviIdx !== idx ? (
            <NormalBtn key={idx} onClick={() => setNaviIdx(idx)}>
              {item}
            </NormalBtn>
          ) : (
            <FixBtn color={"white"} key={idx} onClick={() => setNaviIdx(idx)}>
              {item}
            </FixBtn>
          );
        })}
      </NaviContainer>
      <BodyContainer>
        <ArticleDiv>
          <span>HIGN-END CAR STORE</span>

          <PDiv>
            <p>
              하이엔드 직수입, 구매부터 튜닝까지
              <br />
              고객의 요구에 맞춘 최상의 서비스를 제공합니다.
            </p>
          </PDiv>
        </ArticleDiv>

        <img src={img5} alt="car img"></img>
        <ViewDiv>
          <FixBtn color="gray">
            <a href="https://github.com/nile27/Butter-Toy-Project">VIEW MORE</a>
          </FixBtn>
        </ViewDiv>
      </BodyContainer>
    </Container>
  );
}
