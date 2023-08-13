const ReviewModel = require("./review.model");
const AppError = require("../../utils/appError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const cloudinary = require('cloudinary');

//___________________________________________________createReview__________________________________________________________________
module.exports.CreateReview = catchAsyncError(async (req, res,next) => {
  let isReview = await ReviewModel.findOne({user:req.body.user , product:req.body.product}) 
  if(isReview) return next(new AppError("user alreaddy exist", 404));
  let Review = await ReviewModel.insertMany(req.body);
  res.json({ message: "ok", Review });
});
//___________________________________________________GetReviews__________________________________________________________________

module.exports.GetReviews = catchAsyncError(async (req, res) => {
  let Reviews = await ReviewModel.find({})
  res.json({ massage: "sucsess", Reviews });
});

//___________________________________________________GetReviews_id__________________________________________________________________

module.exports.GetReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Review = await ReviewModel.findById(id);
  if (!Review) {
    return next(new AppError("Review not found", 404));
  }
  res.json({ massage: "sucsess", Review });
});

//___________________________________________________deleteReviews___________________________________________________________________

module.exports.DeleteReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Review = await ReviewModel.findByIdAndDelete(id);
  if (!Review) {
    return next(new AppError("Review not found", 404));
  }
  res.json({ massage: "sucsess", Review });
});
//___________________________________________________UpdateReviews___________________________________________________________________

module.exports.UpdateReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let isReview = await ReviewModel.findById(id);
  if(isReview.user.toString() == req.user._id.toString()){
    let Review = await ReviewModel.findByIdAndUpdate(id,req.body,{new:true});
    res.json({ massage: "sucsess", Review });

  }else{
     next(new AppError(" not found", 404));
  }

});
