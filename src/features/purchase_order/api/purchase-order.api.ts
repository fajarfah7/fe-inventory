import { useFetchData } from "@/api/http"
import type { PaginationQueryParamZodSchema } from "@/schemas/pagination-request.schema"
import type { ProductPurchaseOrderList } from "../types/purchase-order.type";
import { useMemo } from "react";

export const usePurchaseOrderGetProductLists = (supplierId: string, queryParams: PaginationQueryParamZodSchema) => {
    const url = supplierId !== "" ? `/items${supplierId}` : "";

    const { loading, data, errors } = useFetchData<ProductPurchaseOrderList>(url, queryParams);
    const purchaseOrderProductsList = useMemo(() => {
        if (!data) return [];
        return data.data;
    }, [data]);

    return { loading, data: purchaseOrderProductsList, errors, totalPage: data?.pages };
}