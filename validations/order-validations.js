import { z } from "zod";

export const createOrderSchema = z.object({
  customer_name: z
    .string()
    .min(1, "Name minimal 1 character")
    .max(100, "Name maximal 100 character")
    .trim(),
  whatsapp: z
    .string()
    .min(10, "No whatsapp minimal 10 character")
    .max(15, "No whatsapp maximal 15 character")
    .regex(/^[0-9]+$/, "Nomor whatsapp harus angka"),
  address: z.string().min(5, "Alamat terlalu pendek").trim(),
});
