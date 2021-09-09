const errorHandler = (err, req, res, next) => {
  // TODO: Handle errors Send responses based on database errors

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || "Server Error" });
};

module.exports = errorHandler;
