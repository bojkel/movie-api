const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: {type: mongoose.Types.ObjectId, ref:'User', required: true},
    movie_url: {type: String, required: true},
    rating: {type: String, required: true}
})

module.exports = mongoose.model('Rating', RatingSchema);