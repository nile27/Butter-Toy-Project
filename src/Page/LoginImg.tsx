import styled from "styled-components";
import { useEffect, useState } from "react";

import { api } from "../Util/Api";

const UserImg = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  width: 30%;
  height: auto;
  z-index: 150;
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

  async function getInfo() {
    return await api
      .get("/api/v1/assignment/get-info", { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <UserImg>
      <Img src={`${data.result.imgUrl}`} alt="dsa" />
    </UserImg>
  );
}
