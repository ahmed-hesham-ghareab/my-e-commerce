const { uploadMixOfFiles } = require("../../utils/fileupload");
const {
  GetProduct,
  GetProducts,
  UpdateProduct,
  DeleteProduct,
  CreateProduct,
} = require("./product.service");

const router = require("express").Router();
let fileds = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
];
router
  .route("/")
  .post(uploadMixOfFiles(fileds, "product"), CreateProduct)
  .get(GetProducts);
router
  .route("/:id")
  .get(GetProduct)
  .put(uploadMixOfFiles(fileds, "product"), UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;
