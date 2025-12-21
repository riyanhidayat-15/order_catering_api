import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").trim(),
  email: z.string().email("format email tidak valid").trim().toLowerCase(),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const loginSchema = z.object({
  email: z.string().email("format email tidak valid").trim().toLowerCase(),
  password: z.string().min(1, "Password harus diisi"),
});

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({
        message: "Validasi gagal",
        errors,
      });
    }
    req.body = result.data;
    next();
  };
};

export default {
  register: validate(registerSchema),
  login: validate(loginSchema),
};
