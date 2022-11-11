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

export const BoardTable = styled.table`
  text-align: center;
  border: 1px solid #dddddd;
  margin: 2rem 0;
  width: 40rem;
`;

export const BoardTableRow = styled.tr``;

export const BoardTableHead = styled.thead``;
export const BoardTableBody = styled.tbody``;

export const BoardTableText = styled.th`
  background-color: #eeeeee;
  text-align: center;
`;

export const BoardTableLink = styled.a`
  background-color: #eeeeee;
  text-align: center;
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
  margin-right: 1rem;
`;

export const WriteContainer = styled.div`
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
  height: 3rem;
  /* border: 1px solid; */
  align-items: center;
  width: 31rem;
`;

export const Input = styled.input`
  border: 1px solid;
  border-radius: 0.25rem;
  font-weight: 400;
  margin: 0 2rem;
  width: 25rem;
`;

export const FormText = styled.p`
  font-size: medium;
  width: 5rem;
`;

export const ModalStyles = {
  content: {
    top: '20%',
    bottom: '35%',
    left: '30%',
    right: '30%',
  },
};
