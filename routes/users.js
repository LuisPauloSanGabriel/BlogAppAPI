const express = require('express');
const userContoller = require('../controllers/users');
const { verify } = require('../auth');

const router = express.Router();

router.post("/register", userContoller.registerUser);
router.post("/login", userContoller.loginUser);
router.get("/details", verify, userContoller.getUsers);

module.exports = router;