import * as z from "zod";

const menuSchema = z.object({
  name: z
    .string(255)
    .min(1, "Nama minimal 1 character")
    .max(200, "Nama maksimal 200 character")
    .trim(),
  category: z
    .string(100)
    .min(1, "Category minimal 1 character")
    .max(100, "Category maksimal 200 character")
    .trim(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().refine((val) => !isNaN(val))
  ),
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
  createMenuSchema: validate(menuSchema),
};
