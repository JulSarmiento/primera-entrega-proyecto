function isAdmin(req, res, next) {
  if (process.env.IS_ADMIN === "true") {
    return next();
  }

  res.json({
    success: false,
    message: `The route ${req.path} with the method ${req.method} not authorized`,
  });
}

module.exports = isAdmin;
