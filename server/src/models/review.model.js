// Require dependencies
const mongoose = require('mongoose');
const Tour = require('./tour.model');

// Create review schema
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      required: [true, 'A review must have a rating.'],
      min: [1, 'Rating must be above 1.'],
      max: [5, 'Rating must be below 5.'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create index for tour and user in review schema
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Populate user data in query middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

// Calculate average ratings for tour
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  // Update tour's average ratings and rating quantity
  const [tour] = await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats.length ? stats[0].nRating : 0,
    ratingsAverage: stats.length ? stats[0].avgRating : 4.5,
  });

  return tour;
};

// Calculate average ratings after saving review
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

// Calculate average ratings after updating or deleting review
reviewSchema.post(/^findOneAnd/, async (doc) => {
  await doc.constructor.calcAverageRatings(doc.tour);
});

// Create review model
const Review = mongoose.model('Review', reviewSchema);

// Export review model
module.exports = Review;
