const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.post('/', cekApiKey, taskController.create);
router.put('/:id', cekApiKey, taskController.update);
router.delete('/:id', cekApiKey, taskController.remove);

module.exports = router;