import styled from "styled-components";

export const NormalBtn = styled.button`
  font-weight: 700;
  font-size: 28px;
  text-align: center;
  color: var(--navi-btn-color);
  padding: 5px;
  width: auto;
  height: auto;

  &:after {
    display: block;
    content: "";
    border-bottom: solid 1px white;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 0% 50%;
  }

  &:hover {
    color: white;
  }
  &:hover:after {
    color: white;
    transform: scaleX(1);
  }

  &:active {
    color: white;
  }
`;

export const FixBtn = styled.button<{ color: string }>`
  font-weight: 700;
  text-align: center;
  width: auto;
  height: auto;
  font-size: 24px;
  color: ${(props) =>
    props.color !== "white" ? "var(--navi-btn-color)" : "white"};
  border-bottom: solid 1px
    ${(props) => (props.color !== "white" ? "var(--navi-btn-color)" : "white")};

  padding: 0;

  &:hover {
    color: white;
    border-bottom: solid 1px white;
  }

  &:active {
    color: white;
    border-bottom: solid 1px white;
  }
`;

export const LoginBtn = styled.button`
  width: auto;
  height: auto;
  font-weight: 700;
  font-size: 24px;
  color: var(--navi-btn-color);

  &:hover {
    color: white;
  }
`;

export const JoinBtn = styled(LoginBtn)`
  background-color: hsla(234, 9%, 50%, 1);
  padding: 8px;
  border-radius: 10px;
  color: white;

  &:hover {
    background-color: #222630;
    color: hsla(234, 9%, 50%, 1);
  }
`;
