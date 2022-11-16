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
router.post('/', isAdmin, (req, res, next) => {
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
router.put('/:id', [isAdmin, productExist(products)], async (req, res, next) => {
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

// DELETE product by id
router.delete('/:id', [isAdmin, productExist(products)], async (req, res, next) => {
  console.log('estoy tratando de borrar el producto', req.params)
  try{
    if(req.products){
      const {id} = req.params;
      await products.deleteById(Number(id));
      res.status(200).json({
        success: true,
        message: 'Deleted product.',
      })
    }
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;