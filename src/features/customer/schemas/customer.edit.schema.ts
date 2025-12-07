import { z } from "zod";

export const CustomerEditSchema = z.object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    phone_number: z.string().min(10, "Phone number is required"),
    email: z.string(),
});

export type CustomerEditZod = z.infer<typeof CustomerEditSchema>;
