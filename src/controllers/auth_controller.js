const mongoose = require('mongoose')
const authService = require('../services/auth_service')
const responseService = require('../services/response_service')
const User = require('../models/User')
const file_service = require('../services/file_service');

exports.register = (req,res) => {

    User.find({username: req.body.username})
    .then(user=>{
        if(user.length>=1){ 
            res.status(409).json(responseService.alreadyExistsMessage('user'))
        }
        else{
            var newUser = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                name: req.body.name,
                password: authService.encrypt(req.body.password, 10),
                profile_picture_url: req.body.profile_picture_url
            })
            return newUser
            .save()
            .then(user=>{
                console.log('new user: ', user);
                const token = authService.generateToken(user, 60);
                console.log(`the user's token: `, token);
                return res.status(201).json(responseService.registerMessage(req.body.name, user, token))
            }).catch(err=>{
                if(err){
                    res.status(500).json(responseService.registerErrorMessage(err))
                }
            })
        }
    })
}

exports.login = (req,res) => {
    User.find({username: req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json(responseService.doesntExistMessage('user'))
        }
        else{
            if(authService.comparePassword(req.body.password, user[0].password)){

                const token = authService.generateToken(user, 60)

                return res.status(201).json(responseService.loginMessage(user[0],token))
            } 
            else{
                return res.status(401).json(responseService.loginErrorMessage())
            }
        }
    })
}