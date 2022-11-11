const express = require('express');
const router = express.Router();

router.get('/health', (req,res) => {
    res.status(200).json({
        success: true,
        health: 'up',
        enviroment: process.env.ENVIROMENT || 'Not found.'
    })
})


module.exports = router