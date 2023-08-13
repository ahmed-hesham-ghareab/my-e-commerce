const multer = require("multer");
const AppError = require("./appError");

let options = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 400), false);
    }
  }
  const upload = multer({ storage, fileFilter });

  return upload;
};

exports.uploadSingleFile = (fileName, folderName) => {
  return options(folderName).single(fileName);
};

exports.uploadMixOfFiles = (arrayOfFiles, folderName) => {
  return options(folderName).fields(arrayOfFiles);
};
