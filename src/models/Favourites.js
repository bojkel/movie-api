const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: {type: mongoose.Types.ObjectId, ref:'User', required: true},
    movie_url: {type: String, required: true}
})

module.exports = mongoose.model('Favourites', FavouriteSchema);