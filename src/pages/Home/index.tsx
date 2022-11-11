import {
  BoardTitle,
  BoardContainer,
  HomeContainer,
  WriteButton,
  BoardTable,
  BoardTableRow,
  BoardTableText,
  BoardTableBody,
  BoardTableHead,
  BoardTableLink,
} from './styles';
import Header from 'component/Header/index';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getRecentPostAtom, tokenAtom, userAtom } from 'atoms';
import { useAtom, useAtomValue } from 'jotai';
import WritePostModal from 'component/CustomModal/WritePostModal';
import UpdatePostModal from 'component/CustomModal/UpdatePostModal';
import { deletePost } from 'apis/index';

function Home(): JSX.Element {
  const navigate = useNavigate();

  const recentPost = useAtomValue(getRecentPostAtom);
  const regex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;
  const date = recentPost?.results.created.match(regex);
  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isWritePostModal, setIsWritePostModal] = useState(false);
  const [isUpdatePostModal, setIsUpdatePostModal] = useState(false);

  // useEffect(() => {
  //   const a = getPostss();
  //   console.log(a);
  // }, []);

  const authUserWritePostModal = useCallback(() => {
    if (!token) {
      window.alert('로그인 해주세요');
    } else {
      setIsWritePostModal(true);
    }
  }, [token]);

  const authUserUpdatePostModal = useCallback(() => {
    if (!token) {
      window.alert('로그인 해주세요');
    } else {
      setIsUpdatePostModal(true);
    }
  }, [token]);
  const authUserDeletePost = useCallback(() => {
    if (!token) {
      window.alert('로그인 해주세요');
    } else {
      if (!window.confirm('정말 삭제하시겠습니까?')) {
        window.alert('취소하셨습니다.');
      } else {
        deletePost(token, recentPost?.results.id);
        window.alert('삭제하였습니다.');
        window.location.reload();
      }
    }
  }, [token]);

  // input 태그의 value에 값을 삽입하면 해당 폼에 그 값이 보임
  return (
    <>
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
          <WriteButton onClick={authUserWritePostModal}>작성하기</WriteButton>
          <WriteButton onClick={authUserUpdatePostModal}>수정하기</WriteButton>
          <WriteButton onClick={authUserDeletePost}>삭제하기</WriteButton>
        </BoardContainer>
      </HomeContainer>
      {isWritePostModal && <WritePostModal />}
      {isUpdatePostModal && <UpdatePostModal />}
    </>
  );
}

export default Home;
