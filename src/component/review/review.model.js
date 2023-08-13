const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "reviews name required"],
    trim: true,
    // unique: [true, "reviews name unique"],
    minlength: [2, "too short reviews name"],
  },
user:{
  type: mongoose.SchemaTypes.ObjectId,
  ref: "user"    
},
product:{
  type: mongoose.SchemaTypes.ObjectId,
  ref: "product"    
},
ratingAvarage : {
    type:Number,
    min: [1, " ratingAverage must be greader than 1"],
    max: [5, " ratingAverage must be less than 5"],}

},{timestamps:true});

module.exports = mongoose.model("review", Schema);
