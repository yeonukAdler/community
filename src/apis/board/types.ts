interface Board {
  id: number;
  content: string;
  created: string;
  nickname: string;
  title: string;
  username: string;
}

export interface BoardPage {
  nextURL?: string;
  prevURL?: string;
  boards: Board[];
  totalCount: number;
}

export interface BoardResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Board[];
}
