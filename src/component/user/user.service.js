const UserModel = require("./user.model");
const AppError = require("../../utils/appError");
const { catchAsyncError } = require("../../utils/catchAsyncError");

//___________________________________________________createUserCreateUser__________________________________________________________________
module.exports.CreateUser = catchAsyncError(async (req, res,next) => {
    let isUser = await UserModel.findOne({email:req.body.email})
  if(isUser) return next(new AppError("Email already exist", 404))
    // let User = await UserModel.insertMany(req.body);
    let User = new UserModel(req.body);
    await User.save();
  res.json({ message: "ok", User });
});

//___________________________________________________GetUser__________________________________________________________________

module.exports.GetUsers = async (req, res) => {
  let User = await UserModel.find({});
  res.json({ massage: "sucsess", User });
};

//___________________________________________________GetUser_id__________________________________________________________________

module.exports.GetUser = async (req, res, next) => {
  const { id } = req.params;
  let User = await UserModel.findById(id);

  if (!User) {
    return next(new AppError("User not found", 404));
  }
  res.json({ massage: "sucsess", User });
};
//___________________________________________________deleteUser___________________________________________________________________

module.exports.DeleteUser = async (req, res, next) => {
  const { id } = req.params;
  let User = await UserModel.findByIdAndDelete(id);

  if (!User) {
    next(new AppError("User not found", 404));
  }
  res.json({ massage: "sucsess", User });
};
//___________________________________________________UpdateUser___________________________________________________________________

module.exports.UpdateUser = async (req, res, next) => {
  const { id } = req.params;
  let User = await UserModel.findByIdAndUpdate(id, req.body, {new: true,});
  if (!User) {
    next(new AppError("User not found", 404));
  }
  res.json({ massage: "sucsess", User });
};


module.exports.ChangePasswordUser = async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now();  
  let User = await UserModel.findByIdAndUpdate(id, req.body, {new: true,});
  if (!User) {
    next(new AppError("User not found", 404));
  }
  res.json({ massage: "sucsess", User });
};
