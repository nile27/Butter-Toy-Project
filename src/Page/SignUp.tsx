import styled from "styled-components";

interface ismodalOBJ {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginBg = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 40%;
  height: auto;
  background: #2d2d2d;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  position: relative;
  max-width: 500px;
  min-width: 300px;
  > h1 {
    font-size: 28px;
    color: white;
    font-weight: 700;
  }
`;

export default function SignUp({ isModal, setIsModal }: ismodalOBJ) {
  return (
    <LoginBg>
      <LoginContainer></LoginContainer>
    </LoginBg>
  );
}
