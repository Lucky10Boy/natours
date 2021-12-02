const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setTourIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tour;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getReviewsOfUser = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.params.user }).select('-__v');
  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

exports.getReviewsOfTour = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ tour: req.params.tour }).select('-__v');
  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
