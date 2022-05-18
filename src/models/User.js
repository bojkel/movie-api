const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    profile_picture_url: {type: String, required: false}
});

module.exports = mongoose.model('User', UserSchema);