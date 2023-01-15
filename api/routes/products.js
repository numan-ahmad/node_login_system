const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const checkauth = require('../middleware/check-auth')
const productController = require('../controller/products')

router.get('/', productController.products_get_all)

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    }).catch(err => {
      console.log(err);
      res.status(200).json({ error: err })
    })
})

router.post('/', upload.single('productImage'), checkauth, productController.create_products)

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id }).exec().then((doc) => {
    console.log(doc);
    res.status(200).json(doc);
  }).catch((err) => {
    res.status(500).json({
      error: err
    })
  })
})

module.exports = router;