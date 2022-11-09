import { BoardContent, FormText, Input, InputArea, InputContainer, WriteButton, WriteForm, WriteTitle } from './styles';
import Header from 'component/Header';
import React, { useState } from 'react';

function Signup(): JSX.Element {
  const [values, setValues] = useState({ title: '', content: '', author: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent) => {
    // event.preventDefault();
  };
  return (
    <div>
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
      </InputContainer>
    </div>
  );
}

export default Signup;
