const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(201).json({
        message: 'orders get request'
    })
})

router.get('/:orderId', (req,res,next) => {
    const id = req.params.orderId;
    console.log(id);
    if(id == '123') {
        res.status(200).json({
            message: 'order details',
            id:id
        })
    } else {
        res.status(200).json({
            message: 'order not found'
        })
    }
    
})

router.post('/', (req,res,next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'orders post request',
        order: order
    })
})

module.exports = router;