const express = require('express');
const router = express.Router();
const series_controller = require('../controllers/series_controller');
const review_controller = require('../controllers/review_controller');
const favourites_controller = require('../controllers/favourites_controller');

router.get('/',series_controller.getSeries);

router.get('/:id/reviews', review_controller.getReviewsForSeries)

router.get('/:id',series_controller.getById);

router.post('/:id/review', review_controller.createReview);

router.get('/:id/isFavourite/:user_id', favourites_controller.isFavourite);

router.post('/:id/favourites', favourites_controller.addToFavourites);

router.delete('/:id/favourites', favourites_controller.delete);

router.delete('/:id/review/:review_id', review_controller.delete);

module.exports = router;