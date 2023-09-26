import Banner from "./Page/Banner";
import Main from "./Page/Main";
import LoginImg from "./Page/LoginImg";
import GlobalStyles from "./Globalstyle";
import { useRecoilState } from "recoil";
import { isLoginAtom } from "./atoms/IsLogin";
import { useEffect } from "react";
import { removeCookie, getCookie } from "./Util/cookis";
import { api } from "./Util/Api";

function App() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  // useEffect(() => {
  //   function Logout() {
  //     setInterval(function () {
  //       return api
  //         .post("/api/v1/assignment/sign-out", {
  //           accessToken: getCookie("aceessToken"),
  //           refreshToken: getCookie("refreshToken"),
  //         })
  //         .then(() => {
  //           setIsLogin(!isLogin);
  //           removeCookie("aceessToken");
  //           removeCookie("refreshToken");
  //           removeCookie("grantType");
  //           alert("로그인 시간이 만료되었습니다.");
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }, 5000);
  //   }
  //   Logout();
  // }, [isLogin, setIsLogin]);
  return (
    <>
      <GlobalStyles />
      <div className="container">
        <Banner />
        <Main />
        <button onClick={() => setIsLogin(!isLogin)}>d212d12d</button>
        {isLogin ? <LoginImg /> : null};
      </div>
    </>
  );
}

export default App;
