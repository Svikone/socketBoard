const { Router } = require('express');
const Controller = require('../controllers/user');
const mw = require('../midleware/auth')

const router = Router();

router.post('/register', Controller.signup);
router.post('/login', Controller.login);
router.get('/', mw, Controller.getUser);

module.exports = router;
