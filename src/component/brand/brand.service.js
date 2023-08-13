const BrandModel = require("./brand.model");
const slugify = require("slugify");
const AppError = require("../../utils/appError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const cloudinary = require('cloudinary');

//___________________________________________________createBrand__________________________________________________________________
module.exports.CreateBrand = catchAsyncError(async (req, res) => {

  req.body.slug = slugify(req.body.name);
  req.body.image = req.file?.filename;
  let Brand = await BrandModel.insertMany(req.body);
  res.json({ message: "ok", Brand });
});
//___________________________________________________GetBrands__________________________________________________________________

module.exports.GetBrands = catchAsyncError(async (req, res) => {
  let Brands = await BrandModel.find({})
  res.json({ massage: "sucsess", Brands });
});

//___________________________________________________GetBrands_id__________________________________________________________________

module.exports.GetBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Brand = await BrandModel.findById(id);
  if (!Brand) {
    return next(new AppError("brand not found", 404));
  }
  res.json({ massage: "sucsess", Brand });
});

//___________________________________________________deleteBrands___________________________________________________________________

module.exports.DeleteBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Brand = await BrandModel.findByIdAndDelete(id);
  if (!Brand) {
    return next(new AppError("brand not found", 404));
  }
  res.json({ massage: "sucsess", Brand });
});
//___________________________________________________UpdateBrands___________________________________________________________________

module.exports.UpdateBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if(req.body.name){

    req.body.slug = slugify(req.body.name);
  }else{

    req.body.image = req.file?.filename;
  }
  let Brand = await BrandModel.findByIdAndUpdate(id,req.body,{new:true});
  if (!Brand) {
    next(new AppError("brand not found", 404));
  }
  res.json({ massage: "sucsess", Brand });
});
