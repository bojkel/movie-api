const mongoose = require('mongoose');
const User = require('../models/User');
const Favourites = require('../models/Favourites');
const responseService = require('../services/response_service');

exports.addToFavourites = (req, res) => {
    User.findById(req.body.user_id)
    .then(user=>{
        if(user.length<1){
            return res.status(404).json(responseService.noDataMessage('user'))
        }
        else{
            Favourites.find({ 
                user_id: req.body.user_id,
                series_id: req.params.id
            })
            .exec()
            .then(doc=>{
                if(doc.length === 0){
                    var favourite = {
                        _id: new mongoose.Types.ObjectId,
                        user_id: user._id,
                        series_id: req.params.id
                    }
                    return new Favourites(favourite)
                    .save()
                    .then(doc=>{
                        const result = {
                            ID: doc._id,
                            User_ID: doc.user_id,
                            Series_ID: doc.series_id
                        }
                       return res.status(201).json(responseService.addedToFavouritesMessage(result));
                    })
                    .catch(err=>{
                        return res.status(500).json(responseService.postErrorMessage('favourite', err));
                    })
                }else{
                    return res.status(404).json(responseService.alreadyIsInFavouritesMessage());
                }
            })
        }
    })
    .catch(err=>{
        return res.status(404).json(responseService.doesntExistMessage('user', err))
    })
}

exports.getFavouritesForUser = (req,res) => {
    User.find({username: req.params.username})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(404).json({
                Message: responseService.doesntExistMessage('user')
            })
        }

        else{
            Favourites.find({user_id: user[0]._id})
            .select('_id user_id series_id')
            .exec()
            .then(favourites =>{
                if(favourites.length === 0 ){
                    return res.status(500).json(responseService.noDataMessage('favourites'))
                }
                else{
                    const result = {
                        userFavourites: favourites.length,
                        userFavourites: favourites.map(favourite => {
                            return {
                                ID: favourite._id,
                                series_id: favourite.series_id,
                                user_id: favourite.user_id
                            }
                        })
                    }
                    return res.status(200).json(responseService.getAllMessage('favourite', result));
                }
            })
        }
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('favourite', true, err))
        }
    })
}

exports.isFavourite = (req,res) => {
    Favourites.find({
        user_id: req.params.user_id,
        series_id: req.params.id
    })
    .then(response=>{
        if(response.length === 0 ){
            return res.status(404).json(false)
        }
        else{
            return res.status(200).json(true)
        }
    })
}

exports.removeFromFavourites = (req,res) => {
    Favourites.findOneAndDelete({
        user_id: req.params.user_id,
        series_id: req.params.id
    })
    .then(response => {
        return res.status(200).json(responseService.removedFromFavouritesMesasage())
    }).catch(err=>{
        return res.status(404).json({Message: 'Couldnt remove from favourites:', err})
    })
}