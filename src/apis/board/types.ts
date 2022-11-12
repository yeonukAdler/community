interface Board {
  id: number;
  content: string;
  created: string;
  nickname: string;
  title: string;
  username: string;
}

export interface BoardResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Board[];
}
