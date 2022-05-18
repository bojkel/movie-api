const mongoose = require('mongoose')
const authService = require('../services/auth_service')
const responseService = require('../services/response_service')
const User = require('../models/User')
const validationService = require('../services/validation_service')

exports.register = (req,res) => {

    User.find({$or: [{username: req.body.username}, {email: req.body.email}]})
    .then(user=>{
        if(user.length>=1){ 
           return res.status(409).json(responseService.alreadyExistsMessage('user'))
        }
        else{
            if(validationService.isPasswordLongEnough(req.body.password, 8)){
                if(validationService.isEmailValid(req.body.email)){
                    var newUser = new User({
                        _id: new mongoose.Types.ObjectId,
                        username: req.body.username,
                        name: req.body.name,
                        email: req.body.email,
                        password: authService.encrypt(req.body.password, 10),
                        profile_picture_url: req.body.profile_picture_url
                    })
                    return newUser
                    .save()
                    .then(user=>{
                        const token = authService.generateToken(user, 60);
                        return res.status(201).json(responseService.registerMessage(req.body.name, user, token))
                    }).catch(err=>{
                        if(err){
                           return res.status(500).json(responseService.registerErrorMessage(err))
                        }
                    })
                }
                else{
                    return res.status(404).json(responseService.notValidEmailMessage(req.body.email))
                }
            }
            else{
                return res.status(404).json(responseService.notLongEnoughPasswordMessage(8))
            }
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