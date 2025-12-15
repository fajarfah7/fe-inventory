import { z } from "zod";

export const PaginationQueryParamZod = z.object({
    page: z.number().min(1),
    perPage: z.number().optional(),
    search: z.string().optional(),
    sort: z.string().optional(),
});

export type PaginationQueryParamZodSchema = z.infer<typeof PaginationQueryParamZod>;