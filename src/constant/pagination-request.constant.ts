export const PaginationQueryParams = {
    PAGE: "_page",
    PER_PAGE: "_per_page",
    SEARCH: "_search",
    SORT: "_sort"
} as const;

export type PaginationQueryParamKeys = keyof typeof PaginationQueryParams;
