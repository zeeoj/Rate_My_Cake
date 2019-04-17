var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var RatingSchema = new mongoose.Schema({
    stars: Number,
    comment : String
})
var CakeSchema = new mongoose.Schema({
    url : String,
    baker :String,
    avgRating : Number,
    ratings: [RatingSchema],
}, {timestamps: true})

mongoose.model('Cake', CakeSchema);
mongoose.model('Rating', RatingSchema);

module.exports = {
    cake: mongoose.model('Cake'),
    rating: mongoose.model('Rating')};