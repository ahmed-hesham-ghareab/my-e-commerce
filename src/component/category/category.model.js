const mongoose = require('mongoose')

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
  image: String,
},{timestamps:true})
Schema.post('init',(doc)=>{
  doc.image = "http://localhost:3000/category"+doc.image
})
module.exports = mongoose.model("category", Schema);
