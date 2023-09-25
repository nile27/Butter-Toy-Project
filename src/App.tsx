// import React, { useEffect } from "react";
import Banner from "./Page/Banner";
import Main from "./Page/Main";
import GlobalStyles from "./Globalstyle";

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="container">
        <Banner />
        <Main />
      </div>
    </>
  );
}

export default App;
