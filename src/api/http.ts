import { PaginationQueryParams } from "@/constant/pagination-request.constant";
import { formatZodErrors } from "@/hooks/zod-error";
import { PaginationQueryParamZod, type PaginationQueryParamZodSchema } from "@/schemas/pagination-request.schema";
import type { PaginationQueryParamRequest } from "@/types/pagination-request.type";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" }
});

export const useAxiosGetDataTable = <T>(path: string, queryParams: PaginationQueryParamZodSchema) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[] | null>(null);

    const parsedQP = PaginationQueryParamZod.safeParse(queryParams);

    if (!parsedQP.success) {
        const mapErrors: Record<string, string> = formatZodErrors(parsedQP.error);
        const listErrors: string[] = Object.entries(mapErrors).map(([key, val]) => `${key}: ${val}`);
        setErrors(listErrors);
        setLoading(false);
        return { loading, data, errors};
    }

    const querySchema: PaginationQueryParamRequest = {
        [PaginationQueryParams.PAGE]: String(parsedQP.data.page),
        [PaginationQueryParams.PER_PAGE]: String(parsedQP.data.perPage),
        [PaginationQueryParams.SEARCH]: parsedQP.data.search ?? "",
        [PaginationQueryParams.SORT]: parsedQP.data.sort ?? "",
    };

    const query = Object.entries(querySchema)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

    const run = useCallback(async () => {
        try {
            const result = await axiosClient.get(`${path}?${query}`);
            if (result.data) setData(result.data);
        } catch (e: any) {
            setErrors((prev) => [...(prev ?? []), e.message]);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        run();
    }, [run]);

    return { loading, data, errors, run }
};