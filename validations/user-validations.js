import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").trim(),
  email: z.string().email("format email tidak valid").trim().toLowerCase(),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const loginSchema = z.object({
  email: z.string().email("format email tidak valid").trim().toLowerCase(),
  password: z.string().min(1, "Password harus diisi"),
});
