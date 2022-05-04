const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review_controller');

router.get('/', reviewController.getReviews);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;