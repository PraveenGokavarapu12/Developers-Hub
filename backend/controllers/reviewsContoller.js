const asyncHandler = require('express-async-handler');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');
const Review = require('../models/reviewsModel');

const getreviews = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    const reviews = await Review.find({ user_id: req.params.id }).populate('reviewer_id', 'name');
    if(user._id==req.user._id){
        const detailedReviews = reviews.map(review => ({
            username: review.reviewer_id.name,
            rating: review.rating,
            comment: review.comment // Assuming you have a comment field in your Review model
        }));
        res.json(detailedReviews);
    }
    else{
        const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
        const averageRating = reviews.length ? (totalRating / reviews.length).toFixed(2).toString() : "No Reviews Yet";
        res.json({ averageRating });
    }

        

    


});


const addreview = asyncHandler(async (req, res) => {
    const { rating } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
        const review = await Review.create({
            user_id: req.params.id,
            reviewer_id: req.user._id,
            rating
        })
        res.json(review);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }

});

module.exports = { getreviews, addreview };