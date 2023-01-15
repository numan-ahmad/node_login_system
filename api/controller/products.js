const Product = require('../models/product');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find().select('name price _id').exec().then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
}

exports.create_products = (req, res, next) => {
    console.log(req.file)
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
    })
    product.save().then((result) => {
      console.log(result)
      res.status(201).json({
        message: "handling post request",
        createdProduct: result
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
    res.status(200).json({
      message: 'handling post request',
      product: product
    })
  }