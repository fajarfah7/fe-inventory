import { z } from "zod";

// id UUID PK
// supplier_id UUID FK -> suppliers(id)
// po_number VARCHAR(50) UNIQUE
// invoice_number VARCHAR(100) NULL     -- supplier note/faktur
// status ENUM('draft','ordered','partially_received','received','cancelled')
// order_date DATE
// expected_date DATE NULL
// note TEXT NULL
// created_at timestamptz
// updated_at timestamptz

// id UUID PK
// purchase_order_id UUID FK -> purchase_orders(id)
// item_id UUID FK -> items(id)
// qty_ordered NUMERIC
// qty_received NUMERIC DEFAULT 0
// unit_price NUMERIC NULL
// subtotal NUMERIC NULL

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
    note: z.string().optional(),

    products: z.array(PurchaseOrderCreateProductSchema).min(1, "Purchase order at least need one product"),
});

export type PurchaseOrderCreateZod = z.infer<typeof PurchaseOrderCreateSchema>