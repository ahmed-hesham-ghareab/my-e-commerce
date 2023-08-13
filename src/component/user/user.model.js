const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name required"],
      trim: true,
      unique: [true, "brand name unique"],
      minlength: [2, "too short brand name"],
    },
    email: {
      type: String,
      required: [true, "brand name required"],
      trim: true,
      unique: [true, "brand name unique"],
    },
    phone: {
      type: String,
      required: [true, "brand name required"],
    },
    password: {
      type: String,
      required: [true, "brand name required"],
      minlength: [6, "minlength 6 characters"],
    },
    passwordChangedAt: Date,
    profileimage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

Schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password,Number( process.env.ROUND));
});


module.exports = mongoose.model("user", Schema);
