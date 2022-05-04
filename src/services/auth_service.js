const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.encrypt = (obj, saltRounds) =>{

    const encryptedObject =  bcrypt.hashSync(obj, bcrypt.genSaltSync(saltRounds));

    return encryptedObject;

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
    
    return comparedPassword;

}

exports.generateToken = (user, durationInMinutes) => {

    const token = jwt.sign({
        UserID: user._id,
        Username: user.username,
        Name: user.name
    },
    "SuperDuperSecretAndLongWebtokenKey",
    {
        expiresIn: durationInMinutes + "min"
    })

    return token;
}

exports.checkAuthentication = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData =  decoded;
        next();
    }
    catch (error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}