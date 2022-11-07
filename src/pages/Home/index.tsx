import { BoardTitle, BoardContainer, BoardText, HomeContainer, BoardContent, WriteButton } from './styles';
import Header from 'component/Header/index';
import { useNavigate } from 'react-router-dom';

function Home(): JSX.Element {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <Header />
      <BoardContainer>
        <BoardTitle>연욱이의 게시판</BoardTitle>
        <BoardContent>
          <BoardText>번호</BoardText>
          <BoardText>제목</BoardText>
          <BoardText>작성자</BoardText>
          <BoardText>날짜</BoardText>
          <BoardText>조회수</BoardText>
        </BoardContent>
        <WriteButton onClick={() => navigate('/write')}>글 작성하기</WriteButton>
      </BoardContainer>
    </HomeContainer>
  );
}

export default Home;
