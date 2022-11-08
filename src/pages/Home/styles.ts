import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardContainer = styled.div`
  padding: 0 10%;
`;

export const BoardTitle = styled.p`
  font-size: 2rem;
  color: blue;
`;

export const BoardContent = styled.div`
  display: flex;
`;

export const BoardText = styled.p`
  font-size: 1rem;
  color: red;
  padding-right: 3rem;
`;

export const WriteButton = styled.button`
  width: 5rem;
  height: 3rem;
`;
