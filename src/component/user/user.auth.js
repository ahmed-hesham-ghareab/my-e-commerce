const UserModel = require("./user.model");
const AppError = require("../../utils/appError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//___________________________________________________signup_User__________________________________________________________________
module.exports.signUp = catchAsyncError(async (req, res, next) => {
  let isUser = await UserModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("Email already exist", 404));
  let User = new UserModel(req.body);
  await User.save();
  res.status(200).json({ message: "ok", User });
});
//___________________________________________________signin_User__________________________________________________________________
module.exports.signIn = catchAsyncError(async (req, res, next) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new AppError("Email or password incorrect", 404));

  let token = jwt.sign({ name: user.name, userId: user._id }, process.env.JWT);
  res.status(200).json({ token });
});

//___________________________________________________authantication_User__________________________________________________________________

exports.ProductsRoutes = catchAsyncError(async (req, res, next) => {
  let token = req.headers.token;
  if (!token) return next(new AppError("token not provided", 404));

  let decoded = await jwt.verify(token, process.env.JWT);
  console.log(decoded);
  
  let user = await UserModel.findById(decoded.userId);
  if (!user) return next(new AppError("User Not Found", 404));

  if (user.passwordChangedAt) {
    let changePassword = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (changePassword > decoded.iat)
      return next(new AppError("password changed", 404));
  }

  req.user = user;
  next();
});

//___________________________________________________authrize_User__________________________________________________________________

exports.allowedto = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You are not autharized to acces this route", 401)
      );
    next();
  });
};
