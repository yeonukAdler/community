import { HeaderContainer, HeaderButton } from './styles';
import { useNavigate } from 'react-router-dom';

function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderButton onClick={() => navigate('/')}>게시판</HeaderButton>
      <HeaderButton onClick={() => navigate('/login')}>로그인</HeaderButton>
      <HeaderButton onClick={() => navigate('/signup')}>회원가입</HeaderButton>
    </HeaderContainer>
  );
}

export default Header;
