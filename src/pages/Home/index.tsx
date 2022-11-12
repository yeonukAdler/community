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
import { tokenAtom, userAtom } from 'atoms';
import { useAtom, useAtomValue } from 'jotai';
import WritePostModal from 'component/CustomModal/WritePostModal';
import UpdatePostModal from 'component/CustomModal/UpdatePostModal';
import { deletePost } from 'apis/index';
import { BoardResponse } from 'apis/board/types';
import { getPosts } from 'apis/board';
import { Path } from 'constant';

function Home(): JSX.Element {
  const navigate = useNavigate();

  const regex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;
  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isWritePostModal, setIsWritePostModal] = useState(false);
  const [isUpdatePostModal, setIsUpdatePostModal] = useState(false);
  const [boardPage, setBoardPage] = useState<BoardResponse>();

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
      if (!window.confirm('가장 최근에 생성한 게시물을 정말 삭제하시겠습니까?')) {
        window.alert('취소하셨습니다.');
      } else if (boardPage?.results[0]) {
        deletePost(token, boardPage.results[0].id);
        window.alert('삭제하였습니다.');
        window.location.reload();
      } else {
        alert('포스트가 존재하지 않습니다.');
      }
    }
  }, [token, boardPage?.results[0]]);

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
                  <BoardTableText>{board.created.match(regex)}</BoardTableText>
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
