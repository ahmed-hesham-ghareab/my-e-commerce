const mongoose = require("mongoose");

exports.dbConnection = (req, res) => {
  mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
