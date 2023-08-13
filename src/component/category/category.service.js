const CategoryModel = require("./category.model");
const slugify = require("slugify");
const AppError = require("../../utils/appError");
const { catchAsyncError } = require("../../utils/catchAsyncError");

//___________________________________________________createCategory__________________________________________________________________
module.exports.CreateCategory = async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file?.filename;
  console.log(req.body);
  let category = await CategoryModel.insertMany(req.body);
  res.json({ message: "ok", category });
};

//___________________________________________________GetCategories__________________________________________________________________

module.exports.GetCategories = async (req, res) => {
  let categories = await CategoryModel.find({});
  res.json({ massage: "sucsess", categories });
};

//___________________________________________________GetCategories_id__________________________________________________________________

module.exports.GetCategory = async (req, res, next) => {
  const { id } = req.params;
  let category = await CategoryModel.findById(id);

  if (!category) {
    return next(new AppError("category not found", 404));
  }
  res.json({ massage: "sucsess", category });
};
//___________________________________________________deleteCategories___________________________________________________________________

module.exports.DeleteCategory = async (req, res, next) => {
  const { id } = req.params;
  let category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    next(new AppError("category not found", 404));
  }
  res.json({ massage: "sucsess", category });
};
//___________________________________________________UpdateCategories___________________________________________________________________

module.exports.UpdateCategory = async (req, res, next) => {
  const { id } = req.params;
  if(req.body.name){
    req.body.slug = slugify(req.body.name);
  }else{
    req.body.image = req.file?.filename;
  }
  let category = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!category) {
    next(new AppError("category not found", 404));
  }
  res.json({ massage: "sucsess", category });
};
