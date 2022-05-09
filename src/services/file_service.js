const multer = require('multer');
const util = require('util');
const googleCloud = require('./google_auth/config');
const bucket = googleCloud.bucket('movie-api-bucket')

exports.multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
}).single('profile_picture');

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

exports.uploadFile = (file) => new Promise((reject, resolve) => {
    try{
        const {  originalname, buffer } = file
        const blob = bucket.file(originalname)
        const blobStream = blob.createWriteStream({
            resumable: false
        })
        blobStream.on('finish', () => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
            resolve(publicUrl)
        })
        .on('error', () => {
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
    }
    catch(fileError){
        console.log('Could not upload file, error! : ', fileError)
        reject(fileError)
        return null
    }
})