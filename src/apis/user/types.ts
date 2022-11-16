import { z } from 'zod';
export const APIIssuesSchema = z.object({ code: z.number(), detail: z.string(), field: z.string() });
export type APIIssues = z.infer<typeof APIIssuesSchema>;

const AccountResultsSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string(),
  email: z.optional(z.string()),
});
export const AccountResponseSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  count: z.number(),
  results: z.array(AccountResultsSchema),
});

export type Account = z.infer<typeof AccountResponseSchema>;

export const TokenSchema = z.string();
export type Token = z.infer<typeof TokenSchema>;
