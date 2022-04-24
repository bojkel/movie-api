const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@" + process.env.DB_SERVER + ".mongodb.net/"+process.env.DB_DATABASE+"?retryWrites=true&w=majority"

function connect(){
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL, 
            {useNewUrlParser: true}, 
            (err)=>{
                if(err){
                    console.log("Database connection error: ", err)
                    return reject(err)
                }
                else{
                    console.log("Connected to Db!")
                    resolve()
                }
        })
    })
}

function close(){
    mongoose.disconnect()
}

module.exports = { connect, close }