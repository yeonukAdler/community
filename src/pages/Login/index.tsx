import { BoardContent, FormText, Input, InputArea, InputContainer, WriteButton, WriteForm, WriteTitle } from './styles';
import Header from 'component/Header';
import React, { useState, useCallback, useEffect } from 'react';
import { login } from 'apis/index';
import { useAtom, useAtomValue } from 'jotai';
import { tokenAtom } from 'atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { string } from 'zod';

function Login(): JSX.Element {
  const [values, setValues] = useState({ username: '', password: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [token, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent) => {
    // event.preventDefault();
  };
  const onLoginButtonClick = useCallback(async () => {
    try {
      if (values.username && values.password) {
        const username = values.username;
        const password = values.password;
        const userToken = await login(username, password);

        await setToken(userToken);
      }
    } catch (error) {
      window.alert('로그인에 실패했습니다.');
    }
    await moveToHome();
  }, [values.username, values.password]);

  const moveToHome = useCallback(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Header />
      <InputContainer>
        <WriteTitle>로그인</WriteTitle>
        <BoardContent>
          <WriteForm>
            <InputArea>
              <FormText>username : </FormText>
              <Input name="username" placeholder="yeonuk44" value={values.username} onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>password : </FormText>
              <Input name="password" placeholder="asdASD1234!@#$" value={values.password} onChange={handleChange} />
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
