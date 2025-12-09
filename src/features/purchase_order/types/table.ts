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
