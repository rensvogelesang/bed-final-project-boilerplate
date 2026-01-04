export const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  console.error("🔥 STACK:", err?.stack);

  res.status(500).json({
    message:
      "An error occurred on the server, please double-check your request!",
  });
};
