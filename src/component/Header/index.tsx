import { HeaderContainer, HeaderButton } from './styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { tokenAtom, userAtom } from 'atoms';
import { useAtom, useAtomValue } from 'jotai';
import { getuserInfo } from 'apis';

function Header(): JSX.Element {
  const navigate = useNavigate();
  // let token = useAtomValue(tokenAtom);
  let user = useAtomValue(userAtom);
  let [userToken, setUserToken] = useAtom(tokenAtom);

  // useEffect(() => {
  //   if (token && user) {
  //     console.log('token입니다 : ', token);
  //     console.log('user입니다 : ', user);
  //   } else if (token) {
  //     console.log('token입니다 : ', token);
  //   } else if (user) {
  //     console.log('token입니다 : ', token);
  //     console.log('user입니다 : ', user);
  //   } else {
  //     console.log('token입니다 : ', token);
  //     console.log('user입니다 : ', user);
  //   }
  // }, [onclick]);

  // useEffect(() => {
  //   console.log(token);
  // }, []);

  return (
    <>
      <HeaderContainer>
        {userToken ? (
          <>
            <HeaderButton onClick={() => navigate('/')}>게시판</HeaderButton>
            <HeaderButton>{user?.results.username}</HeaderButton>
            <HeaderButton onClick={() => setUserToken(undefined)}>로그아웃</HeaderButton>
          </>
        ) : (
          <>
            <HeaderButton onClick={() => navigate('/')}>게시판</HeaderButton>
            <HeaderButton onClick={() => navigate('/login')}>로그인</HeaderButton>
            <HeaderButton onClick={() => navigate('/signup')}>회원가입</HeaderButton>
          </>
        )}
      </HeaderContainer>
    </>
  );
}

export default Header;
