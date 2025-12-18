import type { PaginationResponse } from "@/types/pagination-response.type";

export type ProductResponse = {
  id: number;
  name: string;
  sku: string;
}

export type ProductPurchaseOrderList = {
    data: ProductResponse[];
} & PaginationResponse;

import type { 
  FieldValues, 
  UseFormReturn 
} from "react-hook-form";

export type ItemResponse = {
  id: number;
  name: string;
  sku: string;
}

export type PurchaseOrderTableItemsProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
};
