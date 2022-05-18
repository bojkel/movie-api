const emailValidator = require('email-validator')

exports.isPasswordLongEnough = (givenPassword, characters) => {
    if(givenPassword.length >= characters) return true
    else return false
}

exports.isEmailValid = (email) => {
    if(emailValidator.validate(email)) return true
    else return false
}