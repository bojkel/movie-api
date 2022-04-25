const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review_controller');

router.get('/', reviewController.getAll);

router.delete('/:id', reviewController.delete);

module.exports = router;