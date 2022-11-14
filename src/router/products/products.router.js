const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin.middleware');
const productExist = require('../../middlewares/productExist.middleware')
const Container = require('../../../classes/container.class');

const products = new Container('products')

// GET all or GET by ID
router.get('/:id?', productExist(products) ,async (req, res, next) => {
  try{
    if(req.products){
      res.status(200).json({
        success: true,
        data: req.products
      });
    } else {
      res.status(200).json({
        success: true,
        data: await products.getAll()
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
    products.saveProduct(req.body)
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
router.put('/:id', productExist(products), async (req, res, next) => {
  try{
    if(req.products){
      console.log('req.params', req.params)
      console.log('req.body', req.body)
      const {id} = req.params;
      const data = await products.update(id, req.body);
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

router.delete('/:id', productExist(products), async (req, res, next) => {
  try{
    if(req.products){
      const {id} = req.params;
      await products.deleteById(id);
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