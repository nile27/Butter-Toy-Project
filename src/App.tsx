import React, { useEffect } from "react";
import Banner from "./Page/Banner";
import GlobalStyles from "./Globalstyle";

function App() {
  // useEffect(() => {
  //   axios
  //     .get("https://assignment.dev.buttercorp.kr/api/v1/assignment/get-info")
  //     .then((res) => console.log(res.data));
  // }, []);
  return (
    <>
      <GlobalStyles />
      <div className="container">
        <Banner />
      </div>
    </>
  );
}

export default App;
