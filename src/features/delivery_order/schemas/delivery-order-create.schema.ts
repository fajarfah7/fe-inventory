import { z } from "zod";

const DeliveryOrderCreateItemSchema = z.object({
    sales_order_product_id: z.string().min(1, "SO Product ID is required"),
    product_name: z.string().optional(),
    product_sku: z.string().optional(),
    special_instruction: z.string().optional(),
    qty_ordered: z.number(),
    quantity: z.number().min(1, "Quantity is requrired"),
});

export const DeliveryOrderCreateSchema = z.object({
    warehouse_id: z.string().min(1, "Warehouse is required"),
    shipped_date: z.string().min(4, "Shipped Date is required"),
    courier_user_id: z.string().min(1, "Courier is required"),
    vehicle_number: z.string().min(1, "Vehicle Number is required"),
    products: z.array(DeliveryOrderCreateItemSchema).min(1, "Product is required"),
});

export type DeliveryOrderCreateZod = z.infer<typeof DeliveryOrderCreateSchema>;
