import { PaginationQueryParams as pqp } from "@/constant/pagination-request.constant";
import { formatZodErrors } from "@/hooks/zod-error";
import { PaginationQueryParamZod, type PaginationQueryParamZodSchema as QueryParamSchema } from "@/schemas/pagination-request.schema";
import type { PaginationQueryParamRequest } from "@/types/pagination-request.type";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

export const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" }
});


// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useFetchData = <T>(path: string, queryParam?: QueryParamSchema) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[] | null>(null);

    const { url: finalURL, errors: parseErrors } = useMemo(() => {
        // RETURN DIRECTLY IF PATH IS EMPTY
        if (path === "") return { url: "", errors: null };

        setLoading(true);
        if (queryParam) {
            const parsedQP = PaginationQueryParamZod.safeParse(queryParam);

            if (!parsedQP.success) {
                const mErr: Record<string, string> = formatZodErrors(parsedQP.error);
                const lErr: string[] = Object.entries(mErr).map(([key, val]) => `${key}: ${val}`);
                return { url: "", errors: lErr };
            }
            
            const querySchema: PaginationQueryParamRequest = {
                [pqp.PAGE]: String(parsedQP.data.page),
                [pqp.PER_PAGE]: String(parsedQP.data.perPage),
                [pqp.SEARCH]: parsedQP.data.search ?? "",
                [pqp.SORT]: parsedQP.data.sort ?? "",
            };

            const query = Object.entries(querySchema)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");

            return { url: path + "?" + query, errors: null }
        }
        return { url: path, errors: null }
    }, [queryParam, path]);

    if (parseErrors) return { loading: false, data: null, errors: parseErrors };

    const run = useCallback(async () => {
        // RETURN DIRECTLY IF PATH IS EMPTY. THIS STATE HANDLED IN MEMO.
        if (finalURL === "") return;

        // await sleep(2000);
        try {
            const result = await axiosClient.get(`${finalURL}`);
            if (result.data) {
                setData(result.data);
                setErrors(null);
            }
        } catch (e: any) {
            // setState({ data: null, loading: false, errors: [e.message] })
            setErrors((prev) => [...(prev ?? []), e.message]);

        } finally {
            setLoading(false);
            // setState((prev) => ({ ...prev, loading: false }))
        }
    }, [finalURL]);

    useEffect(() => {
        run();
    }, [run]);

    // const { data, loading, errors } = state;
    return { data, loading, errors, run }
};