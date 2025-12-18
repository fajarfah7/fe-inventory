import { useFetchData } from "@/api/http";
import type { PaginationQueryParamZodSchema } from "@/schemas/pagination-request.schema";
import type { DeliveryOrderList } from "../types/delivery-order-response";
import { formatTimestamptToDDMMYYYY } from "@/lib/helper";
import { useMemo } from "react";

export function useDeliveryOrderGetDataIndex(queryParams: PaginationQueryParamZodSchema) {
    const { loading, data, errors } = useFetchData<DeliveryOrderList>("/delivery-orders", queryParams);

    const deliveryOrders = useMemo(() => {
        if (!data) return [];
        return data.data.map(item => ({
            ...item,
            expected_date: formatTimestamptToDDMMYYYY(item.expected_date, "/"),
        }));
    }, [data]);

    return { loading, data: deliveryOrders, errors, totalPage: data?.pages }
}