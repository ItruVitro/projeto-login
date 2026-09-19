const express = require("express");
const router = express.Router();
const tokenVerify = require("../middlewares/authMiddlewares.js");
const { createUser, login, getProfile} = require("../controllers/userController.js");

router.post('/cadastro', createUser);

router.post('/login', login);

router.get('/perfil', tokenVerify, getProfile);

module.exports = router;