const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.encrypt = (obj, saltRounds) =>{

    const encryptedObject =  bcrypt.hashSync(obj, bcrypt.genSaltSync(saltRounds))

    return encryptedObject

}

exports.comparePassword = (providedPassword, password) => {

    const comparedPassword = bcrypt.compareSync(providedPassword, password, (err)=>{

        if(err){
            return({
                Message: "Error comparing passwords",
                Error: err
            })
        }
    })
    
    return comparedPassword

}

exports.generateToken = (user, durationInMinutes) => {

    const token = jwt.sign({
        UserID: user[0]._id,
        Email: user[0].email,
        Username: user[0].username,
        Name: user[0].name
    },
    "SuperDuperSecretAndLongWebtokenKey",
    {
        expiresIn: durationInMinutes + "min"
    })

    return token
}