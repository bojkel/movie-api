const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    profile_picture_url: {type: String, required: false}
});

module.exports = mongoose.model('User', UserSchema);