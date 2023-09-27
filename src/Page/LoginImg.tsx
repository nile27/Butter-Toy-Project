import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCookie, removeCookie } from "../Util/cookis";
import { isLoginAtom } from "../atoms/IsLogin";
import { api } from "../Util/Api";
import { useInterval } from "../hook/useInterval";
import { expiresTime } from "../atoms/ExpiresTime";
const UserImg = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default function LoginImg() {
  const [data, setData] = useState({
    message: "",
    result: { imgUrl: "" },
    status: 0,
    timestamp: "",
  });
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const time = useRecoilValue(expiresTime);

  function Logout() {
    const access = getCookie("accessToken");
    const refresh = getCookie("refreshToken");
    if (window.confirm("로그인을 연장하시겠습니까?")) {
      return;
    } else {
      setIsLogin(!isLogin);
      return api
        .post("/api/v1/assignment/sign-out", {
          accessToken: access,
          refreshToken: refresh,
        })
        .then(() => {
          sessionStorage.clear();
          removeCookie("accessToken");
          removeCookie("refreshToken");
          removeCookie("grantType");
          alert("로그인이 만료 되었습니다.");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert(err.response.data.message + " 다시 로그인 해주세요.");
          }
        });
    }
  }

  async function getInfo() {
    return await api
      .get("/api/v1/assignment/get-info", { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }
  useInterval(Logout, time);

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <UserImg>
      <Img src={`${data.result.imgUrl}`} alt="dsa" />
    </UserImg>
  );
}
