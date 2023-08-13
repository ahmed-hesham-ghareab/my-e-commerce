const { uploadSingleFile } = require("../../utils/fileupload");
const {
  CreateBrand,
  GetBrand,
  UpdateBrand,
  GetBrands,
  DeleteBrand,
} = require("./brand.service");

const router = require("express").Router();

router.route("/").post(uploadSingleFile('image','brand'),CreateBrand).get(GetBrands);
router.route("/:id").get(GetBrand).put(uploadSingleFile('image','brand'),UpdateBrand);
router.delete("/:id", DeleteBrand);

module.exports = router;
 