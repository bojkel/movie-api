const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: {type: mongoose.Types.ObjectId, ref:'User', required: true},
    movie_url: {type: String, required: true},
    review: {type: String, required: true}
})

module.exports = mongoose.model('Review', ReviewSchema);