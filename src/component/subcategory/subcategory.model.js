const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "category name required"],
    trim: true,
    unique: [true, "category name unique"],
    minlength: [2, "too short category name"],
  },
  slug: {
    type: String,
    lowercase: true,
   
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "category"    
  }
},{timestamps:true});

module.exports = mongoose.model("subcategory", Schema);
