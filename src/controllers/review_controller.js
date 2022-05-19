const Review = require('../models/Review');
const User = require('../models/User')
const responseService = require('../services/response_service');
const dateService = require('../services/date_service')
const mongoose = require('mongoose');

exports.getReviews = (req,res) => {
    Review.find()
    .select('_id user_id serie_id message rating date_created')
    .exec()
    .then(docs => {
        if(docs.length === 0 ) {
            res.status(500).json(responseService.noDataMessage('reviews'))
        }
        else{
            const result = {
                reviewCount: docs.length,
                reviews: docs.map(review => {
                    return {
                        ID: review._id,
                        User_ID: review.user_id,
                        Serie_ID: review.serie_id,
                        Message: review.message,
                        Rating: review.rating,
                        Created_Date: review.date_created
                    }
                })
            }
            return res.status(200).json(responseService.getAllMessage('review', result))
        }
        
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('review', true, err))
        }
    })
}

exports.getReviewsForSeries = (req,res) => {
    Review.find({serie_id: req.params.id})
    .exec()
    .then(reviews=>{
        if(reviews.length === 0){
            return res.status(404).json(responseService.noDataMessage('review'))
        }
        else{
            const fetchedReviews = {
                Reviews: reviews.map(review=>{
                    return{
                        ID: review._id,
                        User_ID: review.user_id,
                        Serie_ID: review.serie_id,
                        Message: review.message,
                        Rating: review.rating,
                        Created_Date: review.date_created
                    }
                })
            }
            return res.status(200).json(responseService.getByProperty('review', 'id', fetchedReviews))
        }
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('review', false, err))
        }
    })
}

exports.createReview = (req, res) => {

    User.findById(req.body.user_id)
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(404).json(responseService.doesntExistMessage('user'))
        }
        else{
            var review = {
                _id: new mongoose.Types.ObjectId,
                user_id: req.body.user_id,
                serie_id: req.params.id,
                message: req.body.message,
                rating: req.body.rating,
                date_created: dateService.createDateTimeNow()
            }
        
            return new Review(review)
            .save()
            .then(doc=>{
                const result = {
                    ID: doc._id,
                    User_ID: doc.user_id,
                    Serie_ID: doc.serie_id,
                    Message: doc.message,
                    Rating: doc.rating,
                    Created_Date: doc.date_created
                }
                return res.status(201).json(responseService.postMessage('review', result));
            })
            .catch(err=>{
                if(err){
                    return res.status(500).json(responseService.postErrorMessage('review', err));
                }
            })   
        }
    }).catch(err=>{
        if(err){
            return res.status(500).json(responseService.getErrorMessage('user', false, err))
        }
    })
}

exports.deleteReview = (req,res) => {
    Review.findByIdAndDelete({_id: req.params.id})
    .exec()
    .then(deletedReview=>{
        if(deletedReview.length === 0){
            return res.status(404).json(responseService.doesntExistMessage('review'))
        }
        else{
            return res.status(200).json(responseService.deleteByPropertyMessage('review', 'id', deletedReview))
        }
    }).catch(err=>{
        if(err){
            return res.status(500).json(responseService.deleteErrorMessage('review', err))
        }
    })
}