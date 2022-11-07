import styled from 'styled-components';

export const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  padding: 0 10%;
`;

export const WriteTitle = styled.p`
  font-size: 2rem;
  color: blue;
`;

export const BoardContent = styled.div`
  display: flex;
  /* border: 1px solid; */
`;

export const WriteText = styled.p`
  font-size: 1rem;
  color: red;
  padding-right: 0.5rem;
`;

export const WriteButton = styled.button`
  width: 5rem;
  height: 3rem;
`;

export const WriteForm = styled.form`
  width: 60%;
`;

export const InputArea = styled.div`
  display: flex;
  height: 3rem;
  /* border: 1px solid; */
  align-items: center;
`;

export const Input = styled.input`
  /* border: 1px solid; */
  border-radius: 0.25rem;
  font-weight: 400;
  margin: 0 2rem;
  width: 80%;
  height: 60%;
`;
