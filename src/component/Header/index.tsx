import { HeaderContainer, HeaderButton, UserNameButton } from './styles';
import { useNavigate } from 'react-router-dom';
import { tokenAtom, userAtom } from 'atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Path } from 'constant';
import { findAllByAltText } from '@testing-library/react';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [userToken, setUserToken] = useAtom(tokenAtom);

  const headerlogOutButton = () => {
    setUserToken(undefined);
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <HeaderButton onClick={() => navigate(`${Path.home}`)}>게시판</HeaderButton>
      {userToken ? (
        <>
          <UserNameButton>{user?.results[0].username}</UserNameButton>
          <HeaderButton onClick={headerlogOutButton}>로그아웃</HeaderButton>
        </>
      ) : (
        <>
          <HeaderButton onClick={() => navigate(`${Path.logIn}`)}>로그인</HeaderButton>
          <HeaderButton onClick={() => navigate(`${Path.signUp}`)}>회원가입</HeaderButton>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;
