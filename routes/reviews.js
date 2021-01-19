const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError'); 
const Curriculum = require('../models/curriculum');
const Review = require('../models/review')
const { reviewSchema } = require('../validations.js')
const { isLoggedIn } = require('../middleware.js');


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)  
    } else {
        next();
    }
}

router.post('/', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const curriculum = await Curriculum.findById(req.params.id);
    const review = new Review(req.body.review);
    curriculum.reviews.push(review);
    await review.save();
    await curriculum.save();
    res.redirect(`/curriculum/${curriculum._id}`);

}))


router.delete('/:reviewId', isLoggedIn, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Curriculum.findByIdAndUpdate(id, {$pull: {reviews: reviewId} })
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/curriculum/${id}`);

}))

module.exports = router;