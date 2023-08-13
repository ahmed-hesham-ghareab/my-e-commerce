const {
  CreateCategory,
  GetCategory,
  GetCategories,
  DeleteCategory,
  UpdateCategory,
} = require("./category.service");

const subcategoryRoute = require("../subcategory/subcategory.api");
const { uploadSingleFile } = require("../../utils/fileupload");
const { ProductsRoutes, allowedto } = require("../user/user.auth");
const router = require("express").Router();

router.use("/:categoryId/subcategories", subcategoryRoute);
router.route("/").post(ProductsRoutes,allowedto('user'),uploadSingleFile('image','category'), CreateCategory).get(GetCategories);
router.route("/:id").get(GetCategory).put(uploadSingleFile('image','category'),UpdateCategory);
router.delete("/:id", DeleteCategory);

module.exports = router;
