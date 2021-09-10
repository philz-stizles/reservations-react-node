const setCreatedTime = (req, res, next) => {
  req.createdAt = new Date().toISOString();
  next();
};

module.exports = { setCreatedTime };
