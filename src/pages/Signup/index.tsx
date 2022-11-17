import {
  BoardContent,
  SignupContainer,
  FormText,
  Input,
  InputArea,
  InputContainer,
  WriteButton,
  WriteForm,
  WriteTitle,
  SamePW,
  DifferntPW,
} from './styles';
import React, { useState, useCallback } from 'react';
import { register } from 'apis/user/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { tokenAtom } from 'atoms';
import { Path } from 'constant';

function Signup(): JSX.Element {
  const [values, setValues] = useState({ username: '', nickname: '', password: '', email: '', checkPW: '' });
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [activeSignUp, setActiveSignUp] = useState<boolean>(false);

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
      setActiveSignUp(true);
      if (activeSignUp === true) {
        const userToken = await register(username, nickname, password, email);
        setToken(userToken);
        alert('회원가입 성공');
        navigate(`${Path.home}`);
      } else {
        alert('비밀번호가 다릅니다. 확인바랍니다.');
      }
    } catch (error) {
      window.alert('실패했습니다.');
    }
  }, [values.username, values.nickname, values.password, values.email]);

  const activeSignup = () => {
    if (values.password === values.checkPW) {
      return setActiveSignUp(true);
    } else {
      return setActiveSignUp(false);
    }
  };

  return (
    <InputContainer>
      <SignupContainer>
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
              <Input
                type="password"
                id="originPW"
                name="password"
                placeholder="asdASD1234!@#$"
                onChange={handleChange}
              />
            </InputArea>
            <InputArea>
              <FormText>password check : </FormText>
              <Input type="password" id="checkPW" name="checkPW" placeholder="asdASD1234!@#$" onChange={handleChange} />
              {values.checkPW === values.password ? <SamePW>일치</SamePW> : <DifferntPW>불일치</DifferntPW>}
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
      </SignupContainer>
    </InputContainer>
  );
}

export default Signup;
