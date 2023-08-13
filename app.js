//__________________codeError_______________________________________

process.on('uncaughtException',(err)=>{
console.log('uncaughtException',err)
})

//___________________required__________________________________________________________________

const express = require("express");
const { dbConnection } = require("./src/database/dbconnection");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 4000;
var morgan = require("morgan");
const AppError = require("./src/utils/appError");
const glopalMiddleWare = require("./src/utils/glopalMiddleWare")
//_____________________________middleware_____________________________________________________________________________________

if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}

//___________________________connect Apis ______________________________________________________________________________________
app.use(express.json());
app.use(express.static('uploads'))

app.use("/caregories", require("./src/component/category/category.api"));
app.use("/subcaregories", require("./src/component/subcategory/subcategory.api"));
app.use("/brands", require("./src/component/brand/brand.api"));
app.use("/products", require("./src/component/product/product.api"));
app.use("/user", require("./src/component/user/user.api"));
app.use("/review", require("./src/component/review/review.api"));

//_____________________________AppError________________________________________________________________________________________


app.all("*", (req, res, next) => {
  next(
    new AppError(`can't find this route: ${req.originalUrl} on server`, 404)
  );
});
//__________________________________________________________glopalMiddleWare__________________________________________________

app.use(glopalMiddleWare);
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


process.on('unhandledRejection',(err)=>{
  console.log("unhandledRejection",err);
})
