import { AccountResponseSchema, APIIssuesSchema, Token, TokenSchema, Account } from 'apis/types';
import { API_BASE_URL } from 'settings';

// export class APIError extends Error {
//   issues: APIIssues;

//   constructor(issues: APIIssues) {
//     super();
//     this.issues = issues;
//   }
// }

// export async function getPosts(token: Token): Promise<BoardResponse> {
//   const responseObject = await fetch(`${API_BASE_URL}/posts/`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${token}`,
//     },
//   });

//   const json = (await responseObject.json()) as BoardResponse;

//   if (responseObject.ok) {
//     const results = BoardResponseSchema.parse(json);
//     return results;
//   } else {
//     let issues = APIIssuesSchema.parse(json);
//     throw new APIError(issues);
//   }
// }

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
