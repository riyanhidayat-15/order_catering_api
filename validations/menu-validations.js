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

export default menuSchema;