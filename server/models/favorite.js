const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address_name : {
        type: String
    },
    place_name: {
        type: String
    },
    place_url: {
        type: String
    },
    phone_number : {
        type: String
    }

}, { timestamps: true })


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }
