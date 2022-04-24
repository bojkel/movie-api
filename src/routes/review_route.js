const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review_controller');

router.get('/', reviewController.getAll)

router.get('/:id', reviewController.getById);

router.post('/', reviewController.createReview);

router.delete('/:id', reviewController.delete);

module.exports = router