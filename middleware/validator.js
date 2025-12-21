const validator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
  }
};
