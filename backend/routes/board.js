const { Router } = require('express');
const Controller = require('../controllers/board');
const mw = require('../midleware/auth')

const router = Router();

router.post('/create', mw, Controller.createBoard);
router.get('/get', Controller.getBoardByUser);


module.exports = router;