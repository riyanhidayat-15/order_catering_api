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
    .regex(/^[0-9]+$/, "Nomor whatsapp harus angka")
    .transform((val) => val.trim()),
  address: z.string().min(5, "Alamat terlalu pendek").trim(),

  delivery_date: z.string().optional(),
  delivery_time: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/, "Format jam HH:MM:SS")
    .optional(),
  delivery_type: z.enum(["PICKUP", "DELIVERY"]).default("DELIVERY"),
  payment_method: z.enum(["CASH", "TRANSFER", "QRIS"]).default("CASH"),

  items: z
    .array(
      z.object({
        menu_id: z.number().int().positive("Menu ID harus angka positif"),
        quantity: z.number().int().min(1, "Quantity minimal 1"),
        notes: z.string().max(200, "Notes maksimal 200 karakter").optional(),
      })
    )
    .min(1, "Pesanan minimal 1 item!"),
});
