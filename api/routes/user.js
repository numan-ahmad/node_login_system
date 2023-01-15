const express = require('express');
const router = express.Router();
const userControler = require('../controller/user')


router.post('/signup', userControler.create_user)

router.post("/login", userControler.login_user)

router.patch('/reset', userControler.user_reset)

router.delete("/:userId", userControler.delete_user)


module.exports = router;