const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const favouritesController = require('../controllers/favourites_controller')

router.get('/', userController.getUsers)

router.get('/:id', userController.getUserById)

router.get('/username/:username', userController.getUserByUsername)

router.get('/:username/favourites', favouritesController.getFavouritesForUser)

router.delete('/:username', userController.deleteUser)

router.patch('/:username/update_password', userController.updatePassword)

router.patch('/:username', userController.updateUser)

router.patch('/:username/upload_profile_picture', userController.uploadProfilePicture)

module.exports = router