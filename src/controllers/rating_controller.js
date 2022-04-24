const Rating = require('../models/Rating');
const responseService = require('../services/response_service');
const { default: mongoose } = require('mongoose');


exports.getAll = (req,res) => {
    Rating.find()
    .select('_id user_id movie_url rating')
    .exec()
    .then(docs => {
        if(docs.length === 0 ) {
            res.status(500).json(responseService.noDataMessage('rating'))
        }
        else{
            const result = {
                ratingCount: docs.length,
                ratings: docs.map(rating => {
                    return {
                        ID: rating._id,
                        User_ID: rating._id,
                        Movie_URL: rating.movie_url,
                        Rating: rating.review
                    }
                })
            }
            res.status(200).json(responseService.getAllMessage('rating', result))
        }
        
    }).catch(err=>{
        if(err){
            res.status(404).json(responseService.getErrorMessage('rating', true, err))
        }
    })
}

exports.getById = (req,res) => {

    Rating.findById(req.params.id)
    .exec()
    .then(rating=>{
        if(rating.length === 0){
            return res.status(404).json(responseService.noDataMessage('rating'))
        }

        else{
            const fetchedRating = {
                ID: rating._id,
                User_ID: rating._id,
                Movie_URL: rating.movie_url,
                Rating: rating.review
            }
            return res.status(200).json(responseService.getByProperty('rating', 'id', fetchedRating))
        }
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('rating', false, err))
        }
    })
}

exports.createRating = (req, res) => {

    var rating = new Rating({
        _id: new mongoose.Types.ObjectId,
        user_id: req.body.user_id,
        movie_url: req.body.movie_url,
        rating: req.body.rating
    })

    return rating
    .save()
    .then(doc=>{
        const result = {
            ID: doc._id,
            User_ID: doc._id,
            Movie_URL: doc.movie_url,
            Rating: doc.rating
        }

        res.status(201).json(responseService.postMessage('rating', result));
    })
    .catch(err=>{
        if(err){
            res.status(500).json(responseService.postErrorMessage('rating', err));
        }
    })
}

exports.delete = (req,res) => {
    Rating.findOneAndDelete({_id: req.params.id})
    .exec()
    .then(deletedRating=>{

        if(deletedRating.length === 0){
            return res.status(404).json(responseService.doesntExistMessage('rating'))
        }

        else{
            return res.status(200).json(responseService.deleteByPropertyMessage('rating', 'id', deletedRating))
        }
    }).catch(err=>{
        if(err){
            return res.status(500).json(responseService.deleteErrorMessage('rating', err))
        }
    })
}