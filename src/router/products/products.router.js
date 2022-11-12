const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin.middleware');
const productExist = require('../../middlewares/productExist.middleware')
const Container = require('../../../classes/container.class');

const db = 'products';
const products = new Container(db)

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

router.post('/', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
});

router.put('/', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
})

router.delete('/:id', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
});

module.exports = router;