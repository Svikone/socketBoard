const { Router } = require('express');
const Controller = require('../controllers/board');
const mw = require('../midleware/auth')

const router = Router();

router.post('/create', mw, Controller.createBoard);
router.get('/get', mw, Controller.getBoardByUser);
// router.post('/task/create', mw, Controller.createTask);
router.get('/task/get/:taskId', mw, Controller.getTask)

module.exports = router;