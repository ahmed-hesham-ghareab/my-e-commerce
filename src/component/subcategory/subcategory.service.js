const SubCategoryModel = require("./subcategory.model");
const slugify = require("slugify");
const AppError = require("../../utils/appError");
const { catchAsyncError } = require("../../utils/catchAsyncError");

//___________________________________________________createSubCategory__________________________________________________________________
module.exports.CreateSubCategory = catchAsyncError(async (req, res) => {
  const { name, category } = req.body;
  let subcategory = await SubCategoryModel.insertMany({
    name,
    slug: slugify(name),
    category,
  });
  res.json({ message: "ok", subcategory });
});

//___________________________________________________GetSubCategories__________________________________________________________________

module.exports.GetSubCategories = catchAsyncError(async (req, res) => {
  // console.log(req.originalUrl.split('/')[2]);
  console.log(req.params);
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }

  let subcategories = await SubCategoryModel.find( filter ).populate("category","name -_id")
  res.json({ massage: "sucsess", subcategories });
});

//___________________________________________________GetSubCategories_id__________________________________________________________________

module.exports.GetSubCategory = catchAsyncError(async (req, res, next) => {
  const { category } = req.params;
  let subcategory = await SubCategoryModel.find(category);

  if (!subcategory) {
    return next(new AppError("category not found", 404));
  }
  res.json({ massage: "sucsess", subcategory });
});
//___________________________________________________deleteSubCategories___________________________________________________________________

module.exports.DeleteSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let subcategory = await SubCategoryModel.findByIdAndDelete(id);

  if (!subcategory) {
    return next(new AppError("category not found", 404));
  }
  res.json({ massage: "sucsess", subcategory });
});
//___________________________________________________UpdateSubCategories___________________________________________________________________

module.exports.UpdateSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  let Subcategory = await SubCategoryModel.findByIdAndUpdate(id, {
    name,
    slug: slugify(name),
  });

  if (!Subcategory) { // check if category not founded
    next(new AppError("category not found", 404));
  }

  res.json({ massage: "sucsess", Subcategory });

});
