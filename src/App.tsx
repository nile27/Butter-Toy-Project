import Banner from "./Page/Banner";
import Main from "./Page/Main";
import LoginImg from "./Page/LoginImg";
import GlobalStyles from "./Globalstyle";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atoms/IsLogin";

function App() {
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    <>
      <GlobalStyles />
      <div className="container">
        <Banner />
        <Main />
        {isLogin ? <LoginImg /> : null};
      </div>
    </>
  );
}

export default App;
