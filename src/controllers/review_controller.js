const Review = require('../models/Review');
const responseService = require('../services/response_service');
const { default: mongoose } = require('mongoose');


exports.getAll = (req,res) => {
    Review.find()
    .select('_id user_id movie_url review')
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
                        User_ID: review._id,
                        Movie_URL: review.movie_url,
                        Review: review.review
                    }
                })
            }
            res.status(200).json(responseService.getAllMessage('review', result))
        }
        
    }).catch(err=>{
        if(err){
            res.status(404).json(responseService.getErrorMessage('review', true, err))
        }
    })
}

exports.getById = (req,res) => {

    Review.findById(req.params.id)
    .exec()
    .then(review=>{
        if(review.length === 0){
            return res.status(404).json(responseService.noDataMessage('review'))
        }

        else{
            const fetchedReview= {
                ID: review._id,
                User_ID: review._id,
                Movie_URL: review.movie_url,
                Review: review.review
            }
            return res.status(200).json(responseService.getByProperty('review', 'id', fetchedReview))
        }
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('review', false, err))
        }
    })
}

exports.createReview = (req, res) => {

    var review = new Review({
        _id: new mongoose.Types.ObjectId,
        user_id: req.body.user_id,
        movie_url: req.body.movie_url,
        review: req.body.review
    })

    return review
    .save()
    .then(doc=>{
        const result = {
            ID: doc._id,
            User_ID: doc._id,
            Movie_URL: doc.movie_url,
            Review: doc.review
        }

        res.status(201).json(responseService.postMessage('review', result));
    })
    .catch(err=>{
        if(err){
            res.status(500).json(responseService.postErrorMessage('review', err));
        }
    })
}

exports.delete = (req,res) => {
    Review.findOneAndDelete({_id: req.params.id})
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