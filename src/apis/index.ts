import { AccountResponseSchema, APIIssuesSchema, Token, TokenSchema, Account } from 'apis/types';
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
