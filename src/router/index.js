const express = require('express');
const router = express.Router();
const productRouter = require('./products/products.router');
const cartRouter = require('./cart/cart.router');

router.get('/health', (req,res) => {
    res.status(200).json({
        success: true,
        health: 'up',
        enviroment: process.env.ENVIROMENT || 'Not found.'
    })
})
.use('/products', productRouter)
.use('/cart', cartRouter)


module.exports = router