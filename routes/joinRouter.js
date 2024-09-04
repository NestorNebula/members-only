const { Router } = require('express');
const joinRouter = Router();
const joinController = require('../controllers/joinController');

joinRouter.get('/', joinController.getJoin);
joinRouter.post('/', joinController.postJoin);

module.exports = joinRouter;
