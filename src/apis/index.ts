// import { ChangeEvent } from 'react';
// import { z, ZodError } from 'zod';

import { AccountSchema, APIIssuesSchema, Token, TokenSchema } from 'apis/types';

// export class APIError extends Error {
//   issues: APIIssues;

//   constructor(issues: APIIssues) {
//     super();
//     this.issues = issues;
//   }
// }
// export type { Account, APIIssues };

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// export async function login(username: string, password: string): Promise<Token> {
//   let response = await fetch(API_BASE_URL + '/tokens/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username,
//       password,
//     }),
//   });
//   let json = await response.json();
//   if (response.ok) {
//     let UserToken = TokenSchema.parse(json.token);
//     return UserToken;
//   } else {
//     let issues = APIIssuesSchema.parse(json);
//     throw new APIError(issues);
//   }
// }

// export async function getTokenUser(token: Token) {
//   let response = await fetch(API_BASE_URL + `/account/`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${token}`,
//     },
//   });
//   let json = await response.json();
//   if (response.ok) {
//     if (json.image === null) {
//       let object = new URL('../../static/imgs/default-profile.png', import.meta.url); //TODO: 임시 - 용민
//       json.image = object.href;
//     }
//     if (json.phone === null) {
//       json.phone = '';
//     }
//     if (json.email === null) {
//       json.email = '';
//     }
//     if (json.characters) {
//       json.characters = json.characters[0];
//     }
//     let user = AccountSchema.parse(json);
//     return user;
//   } else {
//     let issues = APIIssuesSchema.parse(json);
//   }
// }

// export async function getUser(username: string): Promise<User> {
//   let response = await fetch(API_BASE_URL + `/users/${username}/`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   let json = await response.json();
//   if (response.ok) {
//     if (json.image === null) {
//       let object = new URL('../../static/imgs/default-profile.png', import.meta.url); //TODO: 임시 - 용민
//       json.image = object.href;
//     }
//     let user = UserSchema.parse(json);
//     return user;
//   } else {
//     let issues = APIIssuesSchema.parse(json);
//     throw new APIError(issues);
//   }
// }

// export async function registerCheck(username: string, email: string, password: string): Promise<{ result: boolean }> {
//   const response = await fetch(API_BASE_URL + '/account/register/validate/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       nickname: username,
//       username,
//       email,
//       password,
//     }),
//   });

//   if (response.ok) {
//     return { result: response.status === 200 };
//   } else {
//     const json = await response.json();
//     let issues = APIIssuesSchema.parse(json);
//     throw new APIError(issues);
//   }
// }

// custom
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
