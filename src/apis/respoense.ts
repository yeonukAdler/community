import { z } from 'zod';

export const ApiIssuesSchema = z.object({
  code: z.number(),
  detail: z.string(),
  field: z.string(),
});

export type APIIssuesResponse = z.infer<typeof ApiIssuesSchema>;
