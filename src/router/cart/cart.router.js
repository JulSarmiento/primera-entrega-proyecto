const express = require("express");
const router = express.Router();
const cartExist = require("../../middlewares/cartExist.middleware");
const Container = require("../../../classes/container.class");

const cart = new Container("cart");
const products = new Container("products");

// POST route
router.post("/", async (req, res, next) => {
  try {
    const data = await cart.saveProduct({ products: [] });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE cart route
router.delete("/:id", cartExist(cart), async (req, res, next) => {
  try {
    if (req.cart) {
      const { id } = req.params;
      await cart.deleteById(Number(id));
      res.status(200).json({
        success: true,
        message: "Deleted.",
      });
    }
  } catch (err) {
    next(err);
  }
});

// GET all or GET by ID
router.get("/:id/products", cartExist(cart), async (req, res, next) => {
  console.log("params in get products cart", req.params);
  try {
    if (req.cart) {
      console.log("current cart", req.cart);
      res.status(200).json({
        success: true,
        data: req.cart.products,
      });
    }
  } catch (err) {
    next(err);
  }
});

// POST products in cart, route (using "product")
router.post("/:id/products", cartExist(cart), async (req, res, next) => {
  try {
    const current = req.cart;
    const productId = req.body.product;
    if (!productId) {
      return res.status(200).json({
        success: false,
        message: "There no id to search.",
      });
    }

    const selectedProduct = await products.getbyId(Number(productId));

    if (!selectedProduct) {
      return res.status(200).json({
        success: false,
        message: "Product does not exist.",
      });
    }
    current.products.push(selectedProduct);
    await cart.update(current.id, current);
    res.status(200).json({
      success: true,
      current,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE products in cart, route
router.delete("/:id/products/:id_prod", cartExist(cart), async (req, res, next) => {
    try {
      let current = req.cart;
      const { id_prod } = req.params;

      const selectedProduct = await products.getbyId(Number(id_prod));

      if (!selectedProduct) {
        return res.status(400).json({
          success: false,
          message: "Product does not exist.",
        });
      }
      current.products = current.products.filter(
        (p) => p.id !== Number(id_prod)
      );
      console.log("current products", current.products);
      current = await cart.update(current.id, current);
      res.status(200).json({
        success: true,
        current,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
