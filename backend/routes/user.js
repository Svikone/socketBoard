const { Router } = require('express');
const Controller = require('../controllers/user');

const router = Router();

router.post('/register', Controller.signup);
router.post('/login', Controller.login);

module.exports = router;
