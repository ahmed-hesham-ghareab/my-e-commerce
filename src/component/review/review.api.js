
const { allowedto, ProductsRoutes } = require("../user/user.auth");
const { CreateReview, GetReviews, UpdateReview, GetReview, DeleteReview } = require("./review.service");

const router = require("express").Router();

router.route("/").post(ProductsRoutes,allowedto('user'),CreateReview).get(GetReviews);
router.route("/:id").get(GetReview).put(ProductsRoutes,allowedto("user"),UpdateReview);
router.delete("/:id",ProductsRoutes,allowedto("admin,user"), DeleteReview);

module.exports = router;
 