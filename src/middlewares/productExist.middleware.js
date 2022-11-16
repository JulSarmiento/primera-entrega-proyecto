const productExist = (products) => {
  console.log('estoy tratando de hacer que el middleware de isproductexist funcione')
  return async (req, res, next) => {
    const { id } = req.params;

    if(!id) {
      return next();
    }

    const current = await products.getbyId(Number(id))
    if(current) {
      req.products = current;
      return next();
    };

    res.status(400).json({
      success: false,
      error: `Product not found.`
    });
  };
};

module.exports = productExist;