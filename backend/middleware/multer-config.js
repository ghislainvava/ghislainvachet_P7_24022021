const multer = require("multer");
const path = require('path');

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "video/mp4": "mp4",
  "image/gif": "gif",
  "image.webp": "webp",
};

// logique pour les stockage telechargements de fichiers et modification d image avec multer

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const thename = name.split(".png").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, thename + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");