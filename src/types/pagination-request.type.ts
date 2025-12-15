import { PaginationQueryParams, type PaginationQueryParamKeys } from "@/constant/pagination-request.constant";

export type PaginationQueryParamRequest = Record<(typeof PaginationQueryParams)[PaginationQueryParamKeys], string>;
