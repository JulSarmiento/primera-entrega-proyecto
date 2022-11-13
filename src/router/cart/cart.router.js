const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin.middleware');
const cartExist = require('../../middlewares/cartExist.middleware')
const Container = require('../../../classes/container.class');

const db = 'cart';
const cart = new Container(db)

// GET all or GET by ID
router.get('/:id?', cartExist(cart) ,async (req, res, next) => {
  try{
    if(req.products){
      res.status(200).json({
        success: true,
        data: req.products
      });
    } else {
      res.status(200).json({
        success: true,
        data: await cart.getAll()
      });
    }

  }
  catch (err) {
    next(err);
  }
});

// PORT route
router.post('/', (req, res, next) => {
  console.log('req.body', req.body)
  try{
    cart.saveProduct(req.body)
    res.status(200).json({
      success: true, 
      data: req.body
    })
  }
  catch (err) {
    next(err);
  }
});

// PUT route
router.put('/:id', cartExist(cart), async (req, res, next) => {
  try{
    if(req.products){
      const {id} = req.params;
      const data = await cart.update(id, req.body);
      res.status(200).json({
        success: true,
        data: data
      });
    }
  }
  catch (err) {
    next(err);
  }
})

router.delete('/:id', cartExist(cart), async (req, res, next) => {
  try{
    if(req.products){
      const {id} = req.params;
      await cart.deleteById(id);
      res.status(200).json({
        success: true,
        message: 'Producto eliminado.'
      })
    }
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;