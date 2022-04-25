const User = require('../models/User');
const Favourites = require('../models/Favourites');
const responseService = require('../services/response_service');
const { default: mongoose } = require('mongoose');


exports.getAll = (req,res) => {
    User.find()
    .select('_id username password name fav_movies fav_series')
    .exec()
    .then(docs => {
        if(docs.length === 0 ) {
            res.status(500).json(responseService.noDataMessage('users'))
        }
        else{
            const result = {
                userCount: docs.length,
                users: docs.map(user => {
                    return {
                        ID: user._id,
                        Username: user.username,
                        Name: user.name,
                        Password: user.password,
                        Favourite_Movies: user.fav_movies,
                        Favourite_Series: user.fav_series
                    }
                })
            }
            res.status(200).json(responseService.getAllMessage('user', result))
        }
        
    }).catch(err=>{
        if(err){
            res.status(404).json(responseService.getErrorMessage('user', true, err))
        }
    })
}

exports.getById = (req,res) => {

    User.findById(req.params.userid)
    .exec()
    .then(user=>{

        if(user.length === 0){
            return res.status(404).json(responseService.noDataMessage('user'))
        }

        else{
            const fetchedUser = {
                ID: user._id,
                Username: user.username,
                Name: user.name,
                Email: user.email,
                Password: user.password
            }

            return res.status(200).json(responseService.getByProperty('user', 'id', fetchedUser))

        }
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('user', false, err))
        }
    })

}

exports.getByUsername = (req,res) => {

    User.find({username: req.params.id})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(404).json(responseService.noDataMessage('user'))
        }

        const fetchedUser = {
            ID: user._id,
            Username: user.username,
            Name: user.name,
            Password: user.password
        }

        return res.status(200).json(responseService.getByProperty('user', 'username', fetchedUser))
        
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('user', false, err))
        }
    })
}

exports.delete = (req,res) => {
    User.findOneAndDelete({username: req.params.username})
    .exec()
    .then(deletedUser=>{

        if(deletedUser.length === 0){
            return res.status(404).json(responseService.doesntExistMessage('user'))
        }

        else{
            return res.status(200).json(responseService.deleteByPropertyMessage('user', 'username', deletedUser))
        }
    }).catch(err=>{
        if(err){
            return res.status(500).json(responseService.deleteErrorMessage('user', err))
        }
    })
}

exports.getFavourites = (req,res) => {
    User.find(req.params.username)
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(404).json({
                Message: responseService.doesntExistMessage('user')
            })
        }

        else{
            Favourites.find({username: req.params.username})
            .select('_id user_id movie_url')
            .exec()
            .then(favourites =>{
                if(favourites.length === 0 ){
                    res.status(500).json({
                        Message: 'User has no favourites yet'
                    })
                }
                else{
                    const result = {
                        userFavourites: favourites.length,
                        userFavourites: favourites.map(favourite => {
                            return {
                                ID: favourite._id,
                                movie_url: favourite.movie_url,
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

exports.addToFavourites = (req, res) => {

    var favourite = new Favourites({
        _id: new mongoose.Types.ObjectId,
        user_id: req.body.user_id,
        movie_url: req.body.movie_url
    })

    return favourite
    .save()
    .then(doc=>{
        const result = {
            ID: doc._id,
            User_ID: doc.user_id,
            Movie_URL: doc.movie_url
        }
        res.status(201).json(responseService.postMessage('favourite', result));
    })
    .catch(err=>{
        if(err){
            res.status(500).json(responseService.postErrorMessage('favourite', err));
        }
    })
}