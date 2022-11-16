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
import { updatePost } from 'apis/index';

function UpdatePostModal(): JSX.Element {
  const [values, setValues] = useState({ id: '', title: '', content: '' });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [token, setToken] = useAtom(tokenAtom);
  const user = useAtomValue(userAtom);

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

  /* 
  TODO: 
  
  해당 브라우저에서 최근에 가입한 계정을 통해 예외처리
  */
  const onUpdateButtonClick = useCallback(async () => {
    const id = Number(values.id);
    const title = values.title;
    const content = values.content;
    try {
      if (title && content && id) {
        // if ()
        await updatePost(token, id, title, content);
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      window.alert(error);
    }
  }, [token, values]);

  useEffect(() => {
    openModal();
  }, []);

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyles}>
      <BoardContainer>
        <BoardContent>
          <WriteTitle>포스트 수정하기</WriteTitle>

          <WriteForm>
            <InputArea>
              <FormText>게시물 번호 : </FormText>
              <Input type="text" name="id" onChange={handleChange} />
            </InputArea>
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
      </BoardContainer>
    </Modal>
  );
}

export default UpdatePostModal;
