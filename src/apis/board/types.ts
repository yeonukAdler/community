import { z } from 'zod';

export let APIIssuesSchema = z.object({ code: z.number(), detail: z.string(), field: z.string() });
export type APIIssues = z.infer<typeof APIIssuesSchema>;

const BoardResultsSchema = z.object({
  id: z.number(),
  content: z.string(),
  created: z.string(),
  nickname: z.string(),
  title: z.string(),
  username: z.string(),
});

export const BoardResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(BoardResultsSchema),
});

export type BoardResponse = z.infer<typeof BoardResponseSchema>;
