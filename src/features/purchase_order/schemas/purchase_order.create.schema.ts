import { z } from "zod";

const PurchaseOrderCreateProductSchema = z.object({
    product_id: z.string().min(1, "Product ID is required"),
    qty_ordered: z.number().min(1, "Quantity is required"),
    name: z.string().optional(),
    sku: z.string().optional(),
    description: z.string().optional(),
    special_instruction: z.string().optional(),
});

export const PurchaseOrderCreateSchema = z.object({
    supplier_id: z.string().min(1, "Supplier is required"),
    expected_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    address: z.string().min(1, "Address is required"),
    note: z.string().optional(),

    products: z.array(PurchaseOrderCreateProductSchema).min(1, "Purchase order at least need one product"),
});

export type PurchaseOrderCreateZod = z.infer<typeof PurchaseOrderCreateSchema>