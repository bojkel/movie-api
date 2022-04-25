const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller');

router.get('/', userController.getAll)

router.get('/:id', userController.getById);

router.get('/username/:username', userController.getByUsername)

router.get('/:username/favourites',userController.getFavourites)

router.delete('/:username', userController.delete)

module.exports = router