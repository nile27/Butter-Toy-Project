import { bannerArr } from "../data/Banner_data";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const BannerDiv = styled.div`
  width: 400vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
`;

const BannerImg = styled.img`
  width: 100vw;
  height: auto;
`;

export default function Banner() {
  const [count, setCount] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    setTimeout(() => {
      nextScrollFunc();
      console.log(count);
    }, 3500);
  });

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 1s ease-in-out";
      slideRef.current.style.transform = `translateX(-${
        (100 / (leng + 1)) * count
      }%)`;
    }
  }, [count, leng]);

  // else if (slideRef.current ) {
  //   slideRef.current.style.transform = `translateX(-${0}%)`;
  //   slideRef.current.style.transition = "all 0s ease-in-out";

  //   setCount(0);
  // }

  return (
    <>
      <BannerDiv ref={slideRef}>
        {bannerArr.map((item, idx) => {
          return <BannerImg src={item} key={idx} alt={`${idx}`} />;
        })}
      </BannerDiv>
    </>
  );
}
