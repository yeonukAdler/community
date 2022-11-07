import {
  WriteTitle,
  InputContainer,
  Input,
  WriteContainer,
  BoardContent,
  WriteButton,
  WriteForm,
  InputArea,
} from './styles';
import Header from 'component/Header/index';
import { useNavigate } from 'react-router-dom';

function Write(): JSX.Element {
  const navigate = useNavigate();
  return (
    <WriteContainer>
      <Header />
      <InputContainer>
        <WriteTitle>아래의 입력폼에 정보를 기입해주세요.</WriteTitle>
        <BoardContent>
          <WriteForm>
            <InputArea>
              제목:
              <Input />
            </InputArea>
          </WriteForm>
        </BoardContent>
        <WriteButton onClick={() => navigate('/write')}>제출하기</WriteButton>
        <WriteButton onClick={() => navigate('/')}>게시글 확인하러 가기</WriteButton>
      </InputContainer>
    </WriteContainer>
  );
}

export default Write;
