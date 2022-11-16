import {
  BoardContainer,
  WriteTitle,
  Input,
  WriteForm,
  InputArea,
  FormText,
  BoardContent,
  WriteButton,
  ModalStyles,
} from './styles';
import Modal from 'react-modal';
import React, { useCallback, useEffect, useState } from 'react';
import { tokenAtom, userAtom } from 'atoms';
import { useAtom, useAtomValue } from 'jotai';
import { writePost } from 'apis/board/index';

function WritePostModal(): JSX.Element {
  const [values, setValues] = useState({ title: '', content: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [token, setToken] = useAtom(tokenAtom);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onWriteButtonClick = useCallback(async () => {
    try {
      if (values.title && values.content) {
        const title = values.title;
        const content = values.content;
        await writePost(token, title, content);
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      window.alert(error);
    }
  }, [values.title, values.content, token]);

  useEffect(() => {
    openModal();
  }, []);

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyles}>
      <BoardContainer>
        <BoardContent>
          <WriteTitle>포스트 작성하기</WriteTitle>
          <WriteForm>
            <InputArea>
              <FormText>제목 : </FormText>
              <Input type="text" name="title" onChange={handleChange} />
            </InputArea>
            <InputArea>
              <FormText>내용 : </FormText>
              <Input type="text" name="content" onChange={handleChange} />
            </InputArea>
            <WriteButton type="button" onClick={onWriteButtonClick}>
              제출하기
            </WriteButton>
          </WriteForm>
        </BoardContent>
      </BoardContainer>
    </Modal>
  );
}

export default WritePostModal;
