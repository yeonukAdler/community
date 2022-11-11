import { API_BASE_URL } from 'apis';
import { Token } from 'apis/types';

import { BoardPage, BoardResponse } from './types';

export async function getPosts(token: Token): Promise<BoardPage> {
  const responseObject = await fetch(`${API_BASE_URL}/posts/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  console.log('Response Object', responseObject);

  const response = (await responseObject.json()) as BoardResponse;

  console.log('Response', response);

  if (responseObject.ok) {
    return {
      nextURL: response.next,
      prevURL: response.previous,
      boards: response.results,
      totalCount: response.count,
    };
  } else {
    return {
      boards: [],
      totalCount: 0,
    };
  }
}

/*
  TODO:

  api 커스터마이징해보기
  - 과제는 컨벤션 지키면서 코딩하기
  - JS 강의 하나 완강 : 월요일까지
  - Typescript 공식문서 전부 다 읽기(질문 들어오면 답변할 수 있는 곳까지) : 화요일까지 
  - 커스텀 api 구현(https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript),Header 등 다 넣을 수 있는 수준까지 구현(다이나믹 함수) : 목요일까지
  - 백엔드 프론트엔드의 데이터 타입을 각각 선언하고 프론트에서 쓰기쉬운형태로 바꿔주는 mapper 구현 : 금요일까지
*/
