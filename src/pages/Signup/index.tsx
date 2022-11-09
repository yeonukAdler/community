import { BoardContent, FormText, Input, InputArea, InputContainer, WriteButton, WriteForm, WriteTitle } from './styles';
import Header from 'component/Header';
import React, { useState, useCallback } from 'react';
import { register } from 'apis/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { tokenAtom } from 'atoms';

function Signup(): JSX.Element {
  const [values, setValues] = useState({ username: '', nickname: '', password: '', email: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent) => {
    // event.preventDefault();
  };

  // custom
  const onSignUpCompleteButtonClick = useCallback(async () => {
    // console.log(location.state.nickname);
    try {
      const username = values.username;
      const nickname = values.nickname;
      const password = values.password;
      const email = values.email;
      const userToken = await register(username, nickname, password, email);
      await setToken(userToken);
    } catch (error) {
      window.alert('실패했습니다.');
    }
    await moveToHome();
  }, [values.username, values.nickname, values.password, values.email]);

  const moveToHome = useCallback(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Header />
      <InputContainer>
        <WriteTitle>회원가입</WriteTitle>
        <BoardContent>
          <WriteForm>
            <InputArea>
              <FormText>username : </FormText>
              <Input name="username" placeholder="yeonuk44" value={values.username} onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>nickname : </FormText>
              <Input name="nickname" placeholder="luna" value={values.nickname} onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>password : </FormText>
              <Input name="password" placeholder="asdASD1234!@#$" value={values.password} onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>email : </FormText>
              <Input name="email" placeholder="yeonuk@adler.com" value={values.email} onChange={handleChange} />
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
