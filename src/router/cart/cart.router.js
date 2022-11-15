const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin.middleware');
const cartExist = require('../../middlewares/cartExist.middleware')
const Container = require('../../../classes/container.class');

const cart = new Container('cart');
const products = new Container('products');

// POST route
router.post('/', async (req, res, next) => {
  try{
    const data = await cart.saveProduct({products : []})
    res.status(200).json({
      success: true, 
      data
    })
  }
  catch (err) {
    next(err);
  }
});

// DELETE cart route
router.delete('/:id', cartExist(cart), async (req, res, next) => {
  try{
    if(req.cart){
      const {id} = req.params;
      await cart.deleteById(Number(id));
      res.status(200).json({
        success: true,
        message: 'Carrito eliminado.'
      })
    }
  }
  catch (err) {
    next(err);
  }
});

// GET all or GET by ID
router.get('/:id/products', cartExist(cart) ,async (req, res, next) => {
  console.log('params in get products cart', req.params)
  try{
    if(req.cart){
      console.log('current cart', req.cart)
      res.status(200).json({
        success: true,
        data: req.cart.products
      });
    } 

  }
  catch (err) {
    next(err);
  }
});

// POST products in cart, route
router.post('/:id/products', cartExist(cart), async (req, res, next) => {
  try{
    const current  = req.cart;
    const productId = req.body.product;
    if (!productId) {
      return next("Product not present in request")
    }
    console.log("Adding product", productId)
    current.products.push(await products.getbyId(Number(productId)))
    await cart.update(current.id, current)
    res.status(200).json({
      success: true, 
      current
    })
  }
  catch (err) {
    next(err);
  }
});

// DELETE products in cart, route
router.delete('/:id/products/:id_prod', cartExist(cart), async (req, res, next) => {
  try{
    const current  = req.cart;
    const productId = req.body.product;
    const {id_pro} = req.params
    if (!productId) {
      return next("Product not present in request")
    }

    await cart.deleteById(Number(id_pro))
    await cart.update(current.id, current)
    res.status(200).json({
      success: true, 
      current
    })
  }
  catch (err) {
    next(err);
  }
});


// // PUT route
// router.put('/:id', cartExist(cart), async (req, res, next) => {
//   try{
//     if(req.products){
//       const {id} = req.params;
//       const data = await cart.update(id, req.body);
//       res.status(200).json({
//         success: true,
//         data: data
//       });
//     }
//   }
//   catch (err) {
//     next(err);
//   }
// })



module.exports = router;