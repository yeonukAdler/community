import {
  WriteTitle,
  InputContainer,
  Input,
  WriteForm,
  InputArea,
  FormText,
  BoardTitle,
  BoardContainer,
  BoardText,
  HomeContainer,
  BoardContent,
  WriteButton,
  ModalStyles,
} from './styles';
import Header from 'component/Header/index';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import React, { useState } from 'react';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const [values, setValues] = useState({ title: '', content: '', author: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // 고칠 방법 찾아야 함.
  function alert() {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      window.alert('취소하셨습니다.');
    } else {
      values.author = '';
      values.content = '';
      values.title = '';
      window.alert('삭제하였습니다.');
      window.location.reload();
    }
  }

  // input 태그의 value에 값을 삽입하면 해당 폼에 그 값이 보임
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
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyles}>
          <InputContainer>
            <WriteTitle>아래의 입력폼에 정보를 기입해주세요.</WriteTitle>
            <BoardContent>
              <WriteForm>
                <InputArea>
                  <FormText>제목 : </FormText>
                  <Input type="text" name="title" onChange={handleChange} />
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
        <WriteButton onClick={openModal}>작성하기</WriteButton>
        <WriteButton onClick={openModal}>수정하기</WriteButton>
        <WriteButton onClick={alert}>삭제하기</WriteButton>
      </BoardContainer>
    </HomeContainer>
  );
}

export default Home;
