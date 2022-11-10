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
  BoardTable,
  BoardTableRow,
  BoardTableText,
  BoardTableBody,
  BoardTableHead,
  BoardTableLink,
} from './styles';
import Header from 'component/Header/index';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import React, { useCallback, useEffect, useState } from 'react';
import { getPostsAtom, getRecentPostAtom, tokenAtom, userAtom } from 'atoms';
import { useAtom, useAtomValue } from 'jotai';
import { getPosts, writePost } from 'apis/index';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const [values, setValues] = useState({ title: '', content: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const recentPost = useAtomValue(getRecentPostAtom);
  const regex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;
  const date = recentPost?.results.created.match(regex);
  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

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
      values.content = '';
      values.title = '';
      window.alert('삭제하였습니다.');
      window.location.reload();
    }
  }
  const authUser = () => {
    if (!token) {
      window.alert('로그인 해주세요');
    } else {
      openModal();
    }
  };

  const onWriteButtonClick = useCallback(async () => {
    try {
      if (values.title && values.content) {
        const title = values.title;
        const content = values.content;
        await writePost(token, title, content);
        closeModal();
      }
    } catch (error) {
      window.alert(error);
    }
  }, [values.title, values.content, token]);

  // const getAllPosts = getPosts();

  // useEffect(() => {
  //   console.log(user?.results.username);
  // }, []);

  // input 태그의 value에 값을 삽입하면 해당 폼에 그 값이 보임
  return (
    <HomeContainer>
      <Header />
      <BoardContainer>
        <BoardTitle>연욱이의 게시판</BoardTitle>
        <BoardTable>
          <BoardTableHead>
            <BoardTableRow>
              <BoardTableText>번호</BoardTableText>
              <BoardTableText>제목</BoardTableText>
              <BoardTableText>게시일</BoardTableText>
              <BoardTableText>작성자</BoardTableText>
            </BoardTableRow>
          </BoardTableHead>
          <BoardTableBody>
            <BoardTableRow>
              <BoardTableText>{recentPost?.results.id}</BoardTableText>
              <BoardTableText>
                <BoardTableLink onClick={() => navigate('/login')}>{recentPost?.results.title}</BoardTableLink>
              </BoardTableText>
              <BoardTableText>{date}</BoardTableText>
              <BoardTableText>{recentPost?.results.nickname}</BoardTableText>
            </BoardTableRow>
          </BoardTableBody>
        </BoardTable>
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
                  <Input type="text" name="content" onChange={handleChange} />
                </InputArea>
                <WriteButton type="button" onClick={onWriteButtonClick}>
                  제출하기
                </WriteButton>
              </WriteForm>
            </BoardContent>
          </InputContainer>
        </Modal>
        <WriteButton onClick={authUser}>작성하기</WriteButton>
        <WriteButton onClick={openModal}>수정하기</WriteButton>
        <WriteButton onClick={alert}>삭제하기</WriteButton>
      </BoardContainer>
    </HomeContainer>
  );
}

export default Home;
