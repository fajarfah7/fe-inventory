import { useAxiosGetDataTable } from "@/api/http"
import type { DeliveryOrderDetail } from "../types/delivery-order-response"
import type { PaginationQueryParamZodSchema } from "@/schemas/pagination-request.schema";

export const getDeliveryOrderProducts = () => {
    const queryParam: PaginationQueryParamZodSchema = { page: 1 }
    const { loading, data, errors } = useAxiosGetDataTable<DeliveryOrderDetail>("/delivery-order-details/1", queryParam)

    return { loading, data, errors }
}