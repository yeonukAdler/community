import { API_BASE_URL } from 'apis';
import { Token } from 'apis/types';

import { BoardResponse, BoardResponseSchema, APIIssues, APIIssuesSchema } from './types';

export class APIError extends Error {
  issues: APIIssues;

  constructor(issues: APIIssues) {
    super();
    this.issues = issues;
  }
}

export async function getPosts(token: Token): Promise<BoardResponse> {
  const responseObject = await fetch(`${API_BASE_URL}/posts/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  const json = (await responseObject.json()) as BoardResponse;

  if (responseObject.ok) {
    const results = BoardResponseSchema.parse(json);
    return results;
  } else {
    let issues = APIIssuesSchema.parse(json);
    throw new APIError(issues);
  }
}

/*
  TODO:

  Promise 적용하기
*/
