import {
  WriteTitle,
  InputContainer,
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
import { getRecentPostAtom, tokenAtom, userAtom } from 'atoms';
import { useAtom, useAtomValue } from 'jotai';
import { updatePost } from 'apis/index';

function UpdatePostModal(): JSX.Element {
  const [values, setValues] = useState({ title: '', content: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [token, setToken] = useAtom(tokenAtom);
  const recentPost = useAtomValue(getRecentPostAtom);

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

  const onUpdateButtonClick = useCallback(async () => {
    try {
      if (values.title && values.content) {
        const id = recentPost?.results.id;
        const title = values.title;
        const content = values.content;
        await updatePost(token, id, title, content);
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      window.alert(error);
    }
  }, [values.title, values.content, token, recentPost?.results.id]);

  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyles}>
        <InputContainer>
          <WriteTitle>포스트 수정하기</WriteTitle>
          <BoardContent>
            <WriteForm>
              <InputArea>
                <FormText>제목 : </FormText>
                <Input type="text" name="title" onChange={handleChange} />
              </InputArea>
              <InputArea>
                <FormText>내용 : </FormText>
                <Input type="text" name="content" onChange={handleChange} />
              </InputArea>
              <WriteButton type="button" onClick={onUpdateButtonClick}>
                제출하기
              </WriteButton>
            </WriteForm>
          </BoardContent>
        </InputContainer>
      </Modal>
    </>
  );
}

export default UpdatePostModal;
