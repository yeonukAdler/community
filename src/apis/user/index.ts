import { AccountResponseSchema, APIIssuesSchema, Token, TokenSchema, Account } from 'apis/user/types';
import { API_BASE_URL } from 'settings';

export async function getTokenUser(token: Token): Promise<Account> {
  const response = await fetch(API_BASE_URL + `/users/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  const json = (await response.json()) as Account;

  if (response.ok) {
    // json.results = json.results[0];
    // 최근에 생성된 토큰을 소지한 유저 정보를 가져옴
    const user = AccountResponseSchema.parse(json);
    return user;
  } else {
    const issues = APIIssuesSchema.parse(json);
    throw window.alert(issues);
  }
}

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
