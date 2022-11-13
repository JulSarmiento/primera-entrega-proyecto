const cartExist = (cart) => {
  return async (req, res, next) => {
    const { id } = req.params;

    if(!id) {
      return next();
    }

    const current = await cart.getbyId(Number(id))
    if(current) {
      req.cart = current;
      return next();
    };

    res.status(400).json({
      success: false,
      error: `Product not found.`
    });
  };
};

module.exports = cartExist;