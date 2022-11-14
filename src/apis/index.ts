import { AccountSchema, APIIssuesSchema, Token, TokenSchema, Account } from 'apis/types';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function register(username: string, nickname: string, password: string, email: string): Promise<Token> {
  const response = await fetch(API_BASE_URL + '/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      nickname,
      password,
      email,
    }),
  });

  const json = await response.json();

  if (response.ok) {
    const UserToken = TokenSchema.parse(json.token);
    return UserToken;
  } else {
    const issues = APIIssuesSchema.parse(json);
    console.log(json);
    throw window.alert(issues);
  }
}

export async function login(username: string, password: string): Promise<Token> {
  const response = await fetch(API_BASE_URL + '/tokens/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const json = await response.json();

  if (response.ok) {
    const UserToken = TokenSchema.parse(json.token);
    return UserToken;
  } else {
    const issues = APIIssuesSchema.parse(json);
    throw window.alert(issues);
  }
}

export async function getTokenUser(token: Token): Promise<Account> {
  const response = await fetch(API_BASE_URL + `/users/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  const json = await response.json();
  if (response.ok) {
    json.results = json.results[0];
    // 최근에 생성된 토큰을 소지한 유저 정보를 가져옴
    const user = AccountSchema.parse(json);
    return user;
  } else {
    const issues = APIIssuesSchema.parse(json);
    throw window.alert(issues);
  }
}

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
    return response.status == 204;
  } else {
    const json = await response.json();
    const issues = APIIssuesSchema.parse(json);
  }
}
