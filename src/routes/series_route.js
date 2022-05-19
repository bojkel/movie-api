const express = require('express');
const router = express.Router();
const series_controller = require('../controllers/series_controller');
const review_controller = require('../controllers/review_controller');
const favourites_controller = require('../controllers/favourites_controller');

router.get('/', series_controller.getSeries);

router.get('/:id/reviews', review_controller.getReviewsForSeries)

router.get('/:id', series_controller.getSeriesById);

router.post('/:id/submit_review', review_controller.createReview);

router.get('/:id/isFavourite/:user_id', favourites_controller.isFavourite);

router.post('/:id/favourites', favourites_controller.addToFavourites);

router.delete('/:id/favourites/:user_id', favourites_controller.removeFromFavourites);

module.exports = router;