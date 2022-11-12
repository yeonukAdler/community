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
import { deletePost, getPostss } from 'apis/index';
import { BoardResponse } from 'apis/board/types';
import { getPosts } from 'apis/board';
import { Path } from 'constant';

function Home(): JSX.Element {
  const navigate = useNavigate();

  const recentPost = useAtomValue(getRecentPostAtom);
  const regex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;
  const date = recentPost?.results.created.match(regex);
  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isWritePostModal, setIsWritePostModal] = useState(false);
  const [isUpdatePostModal, setIsUpdatePostModal] = useState(false);
  const [boardPage, setBoardPage] = useState<BoardResponse>();
  useEffect(() => {
    // Object.values<> 공부할 것
    // const map = new Map();
    // const mapWitthType = new Map<string, any[]>();
    // console.log(a);
    // const testPosts = a.map((postss: { content: any }) => postss.content);
    // console.log(testPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        setBoardPage(await getPosts(token));
      })();
    }
  }, [token]);

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
      } else if (recentPost) {
        deletePost(token, recentPost.results.id);
        window.alert('삭제하였습니다.');
        window.location.reload();
      } else {
        alert('포스트가 존재하지 않습니다.');
      }
    }
  }, [token, recentPost]);

  // input 태그의 value에 값을 삽입하면 해당 폼에 그 값이 보임
  return (
    <>
      <HomeContainer>
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
              {boardPage?.results.map((board, boardIndex) => (
                <BoardTableRow key={boardIndex}>
                  <BoardTableText>{board.id}</BoardTableText>
                  <BoardTableText>
                    <BoardTableLink onClick={() => navigate(`${Path.logIn}`)}>{board.title}</BoardTableLink>
                  </BoardTableText>
                  <BoardTableText>{board.created.substring(0, 4)}</BoardTableText>
                  <BoardTableText>{board.nickname}</BoardTableText>
                </BoardTableRow>
              ))}
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
