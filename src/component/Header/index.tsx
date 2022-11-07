import { HeaderContainer, HeaderButton } from './styles';

function Home(): JSX.Element {
  return (
    <HeaderContainer>
      <HeaderButton>로그인</HeaderButton>
      <HeaderButton>회원가입</HeaderButton>
    </HeaderContainer>
  );
}

export default Home;
