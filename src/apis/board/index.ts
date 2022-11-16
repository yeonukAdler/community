import { API_BASE_URL } from 'settings';
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

Promise 개선 필요
*/
export async function writePost(token: Token | undefined, title: String, content: String) {
  const response = await fetch(API_BASE_URL + '/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
  const json = await response.json();

  if (response.ok) {
    console.log('게시물 생성 완료');
  } else {
    const issues = APIIssuesSchema.parse(json);
    throw window.alert(issues);
  }
}

export async function updatePost(
  token: Token | undefined,
  postId: Number | undefined,
  postTitle: String,
  postContent: String
) {
  const response = await fetch(API_BASE_URL + `/posts/${postId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: postTitle,
      content: postContent,
    }),
  });
  if (response.ok) {
    return true;
  } else {
    const json = await response.json();
    const issues = APIIssuesSchema.parse(json);
  }
}

export async function deletePost(token: Token, postId: number) {
  const response = await fetch(API_BASE_URL + `/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) {
    return response.status === 204;
  } else {
    const json = await response.json();
    const issues = APIIssuesSchema.parse(json);
    throw window.alert(issues);
  }
}
