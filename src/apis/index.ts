import { AccountSchema, APIIssuesSchema, Token, TokenSchema, UserSchema } from 'apis/types';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function register(username: string, nickname: string, password: string, email: string) {
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
  console.log(response);
  let json = await response.json();

  if (response.ok) {
    let UserToken = TokenSchema.parse(json.token);
    return UserToken;
  } else {
    let issues = APIIssuesSchema.parse(json);
    console.log(json);
    throw window.alert(issues);
  }
}

export async function login(username: string, password: string) {
  let response = await fetch(API_BASE_URL + '/tokens/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  let json = await response.json();

  if (response.ok) {
    let UserToken = TokenSchema.parse(json.token);
    return UserToken;
  } else {
    let issues = APIIssuesSchema.parse(json);
  }
}

export async function getuserInfo() {
  const response = await fetch(API_BASE_URL + '/users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let json = await response.json();
  if (response.ok) {
    return json.userinfo;
  } else {
    let issues = APIIssuesSchema.parse(json);
  }
}

export async function getTokenUser(token: Token) {
  let response = await fetch(API_BASE_URL + `/users/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  let json = await response.json();
  if (response.ok) {
    json.results = json.results[0];
    let user = AccountSchema.parse(json);
    return user;
  } else {
    let issues = APIIssuesSchema.parse(json);
  }
}
