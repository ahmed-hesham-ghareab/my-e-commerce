const ProductModel = require("./product.model");
const slugify = require("slugify");
const AppError = require("../../utils/appError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const { json } = require("express");
const ApiFeatures = require("../../utils/ApiFeatures");

//___________________________________________________createProduct__________________________________________________________________
module.exports.CreateProduct = catchAsyncError(async (req, res) => {
  let imgs = []
  req.body.slug = slugify(req.body.name);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.files.images.forEach((element) => {
    imgs.push(element.filename);
  });
  req.body.images = imgs;

  // req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.filename;
  let Product = await ProductModel.insertMany(req.body);
  res.json({ message: "ok", Product });
});

//___________________________________________________GetProducts__________________________________________________________________

module.exports.GetProducts = catchAsyncError(async (req, res) => {
  let apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .paginate()
    .search()
    .select()
    .sort()
    .filter();
  let Products = await apiFeatures.mongooseQuery;
  res.json({ page: apiFeatures.page, Products });
});

//___________________________________________________GetProducts_id__________________________________________________________________

module.exports.GetProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Product = await ProductModel.findById(id);
  if (!Product) {
    return next(new AppError("product not found", 404));
  }
  res.json({ massage: "sucsess", Product });
});

//___________________________________________________deleteProducts___________________________________________________________________

module.exports.DeleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Product = await ProductModel.findByIdAndDelete(id);
  if (!Product) {
    return next(new AppError("product not found", 404));
  }
  res.json({ massage: "sucsess", Product });
});
//___________________________________________________UpdateProducts___________________________________________________________________

module.exports.UpdateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let imgs = [];
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  } else {
    req.body.imageCover = req.files.imageCover[0].filename;
    req.files.images.forEach((element) => {
      imgs.push(element.filename);
    });
    req.body.images = imgs;
  }
  let Product = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!Product) {
    next(new AppError("product not found", 404));
  }
  res.json({ massage: "sucsess", Product });
});
