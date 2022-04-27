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
                        Password: user.password
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

    User.findById(req.params.id)
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