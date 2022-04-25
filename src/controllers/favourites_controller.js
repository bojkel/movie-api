
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
            Favourites.find({serie_id: req.params.id, user_id: req.body.user_id})
            .exec()
            .then(doc=>{
                if(doc.length === 0){
                    var favourite = new Favourites({
                        _id: new mongoose.Types.ObjectId,
                        user_id: user._id,
                        serie_id: req.params.id
                    })
                
                    return favourite
                    .save()
                    .then(doc=>{
                        const result = {
                            ID: doc._id,
                            User_ID: doc.user_id,
                            Serie_ID: doc.serie_id
                        }
                        res.status(201).json(responseService.postMessage('favourite', result));
                    })
                    .catch(err=>{
                        if(err){
                            return res.status(500).json(responseService.postErrorMessage('favourite', err));
                        }
                    })
                }else{
                    return res.status(404).json({Message: 'You already have that series in your favourites'});
                }
            })
        }
    })
    .catch(err=>{
        return res.status(404).json(responseService.doesntExistMessage('user', err))
    })
}