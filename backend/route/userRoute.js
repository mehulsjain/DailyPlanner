const express = require("express");
const {register, login, dashboard, profile} = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.use('/dashboard', auth)
router.use('/profile', auth)

router.post('/register', register)
router.post('/login', login)
router.get('/dashboard', dashboard)
router.get('/profile', profile)

module.exports = router