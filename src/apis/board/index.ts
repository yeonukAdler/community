import { API_BASE_URL } from 'apis';
import { Token } from 'apis/types';

import { BoardResponse } from './types';

export async function getPosts(token: Token): Promise<BoardResponse> {
  const responseObject = await fetch(`${API_BASE_URL}/posts/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  const json = (await responseObject.json()) as BoardResponse;

  if (responseObject.ok) {
    console.log('완료');
    return {
      count: json.count,
      previous: json.previous,
      next: json.next,
      results: json.results,
      // const a = BoardRe
    };
  } else {
    console.log('실패');
    return {
      results: [],
      count: 0,
    };
  }
}

/*
  TODO:

  Promise 적용하기
*/
