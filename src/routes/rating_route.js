const express = require('express')
const router = express.Router()
const ratingController = require('../controllers/rating_controller');

router.get('/', ratingController.getAll)

router.get('/:id', ratingController.getById);

router.post('/', ratingController.createRating);

router.delete('/:id', ratingController.delete);

module.exports = router