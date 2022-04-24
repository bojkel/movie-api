const responseService = require('../services/response_service')

exports.getHomePage = (req,res) => {
    return res.status(200).json(responseService.greetingsMessage())
}