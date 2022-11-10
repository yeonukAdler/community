import { BoardContent, FormText, Input, InputArea, InputContainer, WriteButton, WriteForm, WriteTitle } from './styles';
import Header from 'component/Header';
import React, { useState, useCallback } from 'react';
import { register } from 'apis/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { tokenAtom } from 'atoms';

function Signup(): JSX.Element {
  const [values, setValues] = useState({ username: '', nickname: '', password: '', email: '' });
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSignUpCompleteButtonClick = useCallback(async () => {
    try {
      const username = values.username;
      const nickname = values.nickname;
      const password = values.password;
      const email = values.email;
      const userToken = await register(username, nickname, password, email);
      setToken(userToken);
      alert('회원가입 성공');
      navigate('/');
    } catch (error) {
      window.alert('실패했습니다.');
    }
  }, [values.username, values.nickname, values.password, values.email]);

  return (
    <div>
      <Header />
      <InputContainer>
        <WriteTitle>회원가입</WriteTitle>
        <BoardContent>
          <WriteForm>
            <InputArea>
              <FormText>username : </FormText>
              <Input name="username" placeholder="yeonuk44" onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>nickname : </FormText>
              <Input name="nickname" placeholder="luna" onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>password : </FormText>
              <Input name="password" placeholder="asdASD1234!@#$" onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>email : </FormText>
              <Input name="email" placeholder="yeonuk@adler.com" onChange={handleChange} />
            </InputArea>
            <WriteButton type="button" onClick={onSignUpCompleteButtonClick}>
              제출하기
            </WriteButton>
          </WriteForm>
        </BoardContent>
      </InputContainer>
    </div>
  );
}

export default Signup;
