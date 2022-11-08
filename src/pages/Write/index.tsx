import {
  WriteTitle,
  InputContainer,
  Input,
  WriteContainer,
  BoardContent,
  WriteButton,
  WriteForm,
  InputArea,
  FormText,
} from './styles';
import Header from 'component/Header/index';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Write(): JSX.Element {
  const navigate = useNavigate();
  const [values, setValues] = useState({ title: '', content: '', author: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <WriteContainer>
      <Header />
      <InputContainer>
        <WriteTitle>아래의 입력폼에 정보를 기입해주세요.</WriteTitle>
        <BoardContent>
          <WriteForm onSubmit={handleSubmit}>
            <InputArea>
              <FormText>제목 : </FormText>
              <Input type="text" name="title" value={values.title} onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>내용 : </FormText>
              <Input type="text" name="content" value={values.content} onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>작성자 : </FormText>
              <Input type="text" name="author" value={values.author} onChange={handleChange} />
            </InputArea>
            <WriteButton type="submit">제출하기</WriteButton>
          </WriteForm>
        </BoardContent>

        <WriteButton onClick={() => navigate('/')}>게시글 확인하러 가기</WriteButton>
      </InputContainer>
    </WriteContainer>
  );
}

export default Write;
