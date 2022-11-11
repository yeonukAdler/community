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

export let PostSchema = z.object({
  results: z.object({
    id: z.number(),
    username: z.string(),
    nickname: z.string(),
    created: z.string(),
    title: z.string(),
    content: z.string(),
  }),
});

// Promise란 무엇인가 공부 필요함.
export let tssPostchema = z.object({
  next: z.string(),
  previous: z.string(),
  count: z.number(),
  results: z.array(PostSchema),
});

export type Post = z.infer<typeof PostSchema>;

export let PostCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
});
export type PostCreate = z.infer<typeof PostCreateSchema>;

export let TokenSchema = z.string();
export type Token = z.infer<typeof TokenSchema>;
