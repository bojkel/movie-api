const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: {type: mongoose.Types.ObjectId, ref:'User', required: true},
    serie_id: {type: String, required: true},
    message: {type: String, required: true},
    rating: {type: Number, required: true},
    date_created: {type: String, required: true}
})

module.exports = mongoose.model('Review', ReviewSchema);