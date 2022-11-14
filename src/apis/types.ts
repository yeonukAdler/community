import { z } from 'zod';
export const APIIssuesSchema = z.object({ code: z.number(), detail: z.string(), field: z.string() });
export type APIIssues = z.infer<typeof APIIssuesSchema>;

export type Account = z.infer<typeof AccountSchema>;
export const AccountSchema = z.object({
  results: z.object({
    id: z.string(),
    username: z.string(),
    nickname: z.string(),
    email: z.optional(z.string()),
  }),
});

export const PostSchema = z.object({
  results: z.object({
    id: z.number(),
    username: z.string(),
    nickname: z.string(),
    created: z.string(),
    title: z.string(),
    content: z.string(),
  }),
});

export type Post = z.infer<typeof PostSchema>;

export const PostCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
});
export type PostCreate = z.infer<typeof PostCreateSchema>;

export const TokenSchema = z.string();
export type Token = z.infer<typeof TokenSchema>;
