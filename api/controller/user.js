const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.create_user = (req, res, next) => {
  console.log('dsadsadas');
  User.find({ email: req.body.email })
    .exec().then(user => {
      console.log('hello',);
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists try with differnet email'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log('woerlrsdnajh', err);
            return res.status(500).json({
              error: err,
              message: "error"
            });
          } else {
            console.log(req.body.email, 'hhhhhhh');
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })
            user.save().then(() => {
              res.status(201).json({
                message: 'user created'
              })
            }).catch((err) => {
              res.status(500).json({
                error: err
              })
            })
          }
        })
      }
    })

}

exports.login_user = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(400).json({
          message: "Auth faild"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Auth faild"
          })
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          }, "secret", {
            expiresIn: "1h"
          })
          return res.status(200).json({
            message: "Auth successful",
            token: token
          })
        }
        res.status(401).json({
          message: "Auth faild"
        })
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })

}

exports.user_reset = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec().then(user => {
      bcrypt.compare(req.body.oldPassword, user[0].password, (err, match) => {
        if (!match || err) {
          res.status(500).json({
            error: "Invalid  Old Password"
          })
        }
        else {

          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({
                error: err
              })
            }
            else {
              User.updateOne({ email: req.body.email }, { $set: { password: hash } })
                .then((result) => {
                  res.status(200).json({
                    message: 'Password Successfully Updated'
                  })
                })
                .catch(err => {
                  res.status(500).json({
                    error: 'Failed to Update the Password'
                  })
                })
            }
          })

        }
      });
    })

}

exports.delete_user = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "user deleted"
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
}