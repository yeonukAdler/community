import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardTitle = styled.p`
  font-size: 2rem;
  color: blue;
`;

export const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardText = styled.p`
  font-size: 1rem;
  color: red;
  padding-right: 3rem;
`;

export const WriteButton = styled.button`
  width: 5rem;
  height: 3rem;
  margin-right: 1rem;
`;

export const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WriteTitle = styled.p`
  font-size: 2rem;
  color: blue;
`;

export const WriteText = styled.p`
  font-size: 1rem;
  color: red;
  padding-right: 0.5rem;
`;

export const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputArea = styled.div`
  display: flex;
  /* border: 1px solid; */
  align-items: center;
  width: 80rem;
  justify-content: start;
`;

export const PasswordCheckArea = styled.div`
  display: flex;
  /* border: 1px solid; */
  align-items: center;
  width: 80rem;
  justify-content: start;
`;

export const Input = styled.input`
  border: 1px solid;
  border-radius: 0.25rem;
  font-weight: 400;
  margin: 0 2rem;
  width: 15rem;
  height: 2rem;
`;

export const SamePW = styled.p`
  color: blue;
`;

export const DifferntPW = styled.p`
  color: red;
`;

export const FormText = styled.p`
  font-size: medium;
  width: 10rem;
`;
