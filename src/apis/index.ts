import { ApiIssuesSchema } from 'apis/respoense';
import { APIMethod, APIIssuesType } from 'apis/types';
import { API_BASE_URL } from 'settings';

const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

export class APIError extends Error {
  issues: APIIssuesType;

  constructor(issues: APIIssuesType) {
    super();
    this.issues = issues;
  }
}

type APIOptions = {
  method?: APIMethod;
  token?: string;
  body?: BodyInit;
};

export const requestAPI = async (url: string, apiOptions?: APIOptions) => {
  const method = apiOptions?.method ?? 'GET';
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    token,
    headers: {
      ...headers,
      ...(apiOptions?.token ? { Authorization: `Token ${apiOptions.token}` } : []),
    },
    body: apiOptions?.body,
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new APIError(ApiIssuesSchema.parse(await response.json()));
  }
};
