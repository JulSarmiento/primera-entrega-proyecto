const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
});

router.get('/:id/products', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
});

router.post('/:id/products', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
})

router.delete('/:id/products/:id_prod', (req, res, next) => {
  try{

  }
  catch (err) {
    next(err);
  }
});

module.exports = router;