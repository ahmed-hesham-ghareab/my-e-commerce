const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "coupon name required"],
    trim: true,
    unique: [true, "coupon name unique"],
  },
  discount: {
    type: String,
  },
  expire: {
    type: Date,
  },
 
},{timestamps:true});

module.exports = mongoose.model("coupon", Schema);
