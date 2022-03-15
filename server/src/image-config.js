const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'imagestore');
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
  });

  conf = multer({storage});
module.exports = conf;

