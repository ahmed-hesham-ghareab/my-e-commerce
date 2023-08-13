const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name required"],
      trim: true,
      unique: [true, "product name unique"],
      minlength: [2, "too short product name"],
    },
    description: {
      type: String,
      required: [true, "product description required"],
      trim: true,
      minlength: [10, "too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity required"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price required"],
    },
    priceAfterDescount: {
      type: Number,
      required: [true, "product priceAfterDescount required"],
    },
    sold: {
      type: Number,
      required: [true, "product sold required"],
      default: 0,
    },

    slug: {
      type: String,
      lowercase: true,
    },
    colors: [String],

    category: {
      type: mongoose.SchemaTypes.ObjectId,

      ref: "category",
      required: [true, "product category required"],
    },
    subcategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "subcategory",
      required: [true, "product subcategory required"],
    },
    brand: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "brand",
      required: [true, "product brand required"],
    },

    ratingAverage: {
      type: Number,
      min: [1, " ratingAverage must be greader than 1"],
      max: [10, " ratingAverage must be less than 10"],
    },

    ratingcount: {
      type: Number,
      default: 0,
    },
    imageCover: String,
    images: [String],
  },
  { timestamps: true }
);
Schema.post("init", (doc) => {
  let imgs = [];
  doc.imageCover = "http://localhost:3000/product" + doc.imageCover;
  doc.images.forEach((ele) => {
    imgs.push("http://localhost:3000/product" + ele.filename);
  });
  doc.images = imgs;
});
module.exports = mongoose.model("product", Schema);
