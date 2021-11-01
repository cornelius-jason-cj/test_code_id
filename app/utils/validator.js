const validate = (schema) => (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  } else {
    next();
  }
};

export { validate };
