import type { PaginationResponse } from "@/types/pagination-response.type";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type DeliveryOrderRow = {
    id: string;
    do_number: string;
    buyer_company_name: string;
    expected_date: string;
    status: string;
}

export type DeliveryOrderList = {
    data: DeliveryOrderRow[];
} & PaginationResponse;

type DeliveryOrderProductRow = {
    sales_order_product_id: string;
    product_id: string;
    product_name: string;
    product_sku: string;
    qty_ordered: number;
    special_instruction: string;
    quantity: number;
}
export type DeliveryOrderDetail = {
    id: string;
    do_number: string;
    buyer_company_name: string;
    expected_date: string;
    status: string;
    products: DeliveryOrderProductRow[];
}

export type DeliveryOrderCardProps<T extends FieldValues> = {
    form: UseFormReturn<T>
};