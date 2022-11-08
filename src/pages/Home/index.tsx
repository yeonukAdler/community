import {
  WriteTitle,
  InputContainer,
  Input,
  WriteContainer,
  WriteForm,
  InputArea,
  FormText,
  BoardTitle,
  BoardContainer,
  BoardText,
  HomeContainer,
  BoardContent,
  WriteButton,
} from './styles';
import Header from 'component/Header/index';
import { useNavigate } from 'react-router-dom';
// import { Write } from 'pages/Write/index';
import Modal from 'react-modal';
import React, { useState } from 'react';

const customStyles = {
  content: {
    top: '20%',
    bottom: '20%',
    left: '20%',
    right: '20%',
  },
};

function Home(): JSX.Element {
  const navigate = useNavigate();
  const [values, setValues] = useState({ title: '', content: '', author: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal2IsOpen, set2IsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function open2Modal() {
    set2IsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let saveInputValues = values;
  };

  return (
    <HomeContainer>
      <Header />
      <BoardContainer>
        <BoardTitle>연욱이의 게시판</BoardTitle>
        <BoardContent>
          <BoardText>제목</BoardText>
          <BoardText>내용</BoardText>
          <BoardText>작성자</BoardText>
        </BoardContent>
        <BoardContent>
          <BoardText>{values.title}</BoardText>
          <BoardText>{values.content}</BoardText>
          <BoardText>{values.author}</BoardText>
        </BoardContent>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <InputContainer>
            <WriteTitle>아래의 입력폼에 정보를 기입해주세요.</WriteTitle>
            <BoardContent>
              <WriteForm onSubmit={handleSubmit}>
                <InputArea>
                  <FormText>제목 : </FormText>
                  <Input type="text" name="title" value={values.title} onChange={handleChange} />
                </InputArea>
                <InputArea>
                  <FormText>내용 : </FormText>
                  <Input type="text" name="content" value={values.content} onChange={handleChange} />
                </InputArea>
                <InputArea>
                  <FormText>작성자 : </FormText>
                  <Input type="text" name="author" value={values.author} onChange={handleChange} />
                </InputArea>
                <WriteButton type="submit" onClick={closeModal}>
                  제출하기
                </WriteButton>
              </WriteForm>
            </BoardContent>
          </InputContainer>
        </Modal>
        <WriteButton id="a" onClick={openModal}>
          글 작성하기
        </WriteButton>
        <WriteButton id="b" onClick={openModal}>
          글 수정하기
        </WriteButton>
        <WriteButton id="c" onClick={openModal}>
          글 삭제하기
        </WriteButton>
      </BoardContainer>
    </HomeContainer>
  );
}

export default Home;
