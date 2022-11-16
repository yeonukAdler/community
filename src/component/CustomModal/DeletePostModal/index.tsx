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
import { tokenAtom } from 'atoms';
import { useAtom } from 'jotai';
import { deletePost } from 'apis/board/index';

function DeletePostModal(): JSX.Element {
  const [values, setValues] = useState({ id: '' });
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

  /* 
  TODO:

  왜 await 안쓰면 API 구동이 안되는지 알아볼 것
  */

  const onDeleteButtonClick = useCallback(async () => {
    const id = Number(values.id);
    console.info(id);
    try {
      if (token) {
        if (id) {
          await deletePost(token, id);
          closeModal();
          window.location.reload();
          alert(`${values.id} 번째 게시물을 삭제했습니다.`);
        } else {
          alert('게시물 번호를 입력해주세요.');
        }
      } else {
        alert('로그인 해주세요.');
      }
    } catch (error) {
      alert(error);
    }
  }, [token, values]);

  useEffect(() => {
    openModal();
  }, []);

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyles}>
      <BoardContainer>
        <BoardContent>
          <WriteTitle>포스트 삭제하기</WriteTitle>
          <WriteForm>
            <InputArea>
              <FormText>삭제할 게시물 번호 : </FormText>
              <Input type="text" name="id" onChange={handleChange} />
            </InputArea>
            <WriteButton type="button" onClick={onDeleteButtonClick}>
              제출하기
            </WriteButton>
          </WriteForm>
        </BoardContent>
      </BoardContainer>
    </Modal>
  );
}

export default DeletePostModal;
