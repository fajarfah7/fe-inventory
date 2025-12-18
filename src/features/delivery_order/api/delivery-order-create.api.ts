import { useFetchData } from "@/api/http"
import type { DeliveryOrderDetail } from "../types/delivery-order-response"

export const getDeliveryOrderProducts = () => {
    const { loading, data, errors } = useFetchData<DeliveryOrderDetail>("/delivery-order-details/1")

    return { loading, data, errors }
}