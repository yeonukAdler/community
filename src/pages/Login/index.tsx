import { BoardContent, FormText, Input, InputArea, InputContainer, WriteButton, WriteForm, WriteTitle } from './styles';
import Header from 'component/Header';
import React, { useState, useCallback, useEffect } from 'react';
import { login } from 'apis/index';
import { useAtom } from 'jotai';
import { tokenAtom } from 'atoms';
import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {
  const [values, setValues] = useState({ username: '', password: '' });
  const [token, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onLoginButtonClick = useCallback(async () => {
    try {
      if (values.username && values.password) {
        const username = values.username;
        const password = values.password;
        const userToken = await login(username, password);
        setToken(userToken);
        alert('로그인 성공');
        navigate('/');

        // 아래 코드로 토큰 값에 대해서 검증하려고 할 시, token 값이 undefined 가 나옴. 왜 그런지 이유 물어볼 것
        // if (token) {
        //   await navigate('/');
        // }
      }
    } catch (error) {
      window.alert('로그인에 실패했습니다.');
    }
  }, [values.username, values.password]);

  return (
    <div>
      <Header />
      <InputContainer>
        <WriteTitle>로그인</WriteTitle>
        <BoardContent>
          <WriteForm>
            <InputArea>
              <FormText>username : </FormText>
              <Input name="username" placeholder="yeonuk44" onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>password : </FormText>
              <Input name="password" placeholder="asdASD1234!@#$" onChange={handleChange} />
            </InputArea>
            <WriteButton type="button" onClick={onLoginButtonClick}>
              제출하기
            </WriteButton>
          </WriteForm>
        </BoardContent>
      </InputContainer>
    </div>
  );
}

export default Login;
