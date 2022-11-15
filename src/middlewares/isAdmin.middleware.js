function isAdmin(req, res, next) {
  if (process.env.IS_ADMIN){
    return next();
  }

  res.json({
    message: 'Larry estuvo aqui'
  })
};


module.exports = isAdmin;