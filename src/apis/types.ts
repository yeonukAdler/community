import { z } from 'zod';
export let APIIssuesSchema = z.object({ code: z.number(), detail: z.string(), field: z.string() });
export type APIIssues = z.infer<typeof APIIssuesSchema>;

export type Account = z.infer<typeof AccountSchema>;
export let AccountSchema = z.object({
  results: z.object({
    id: z.string(),
    username: z.string(),
    nickname: z.string(),
    email: z.optional(z.string()),
  }),
});

export let UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string(),
  bio: z.string(),
  image: z.string().nullable(),
  url: z.string(),
  grade: z.number(),
});
export type User = z.infer<typeof UserSchema>;

export let TokenSchema = z.string();
export type Token = z.infer<typeof TokenSchema>;
