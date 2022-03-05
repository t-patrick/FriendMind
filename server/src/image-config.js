const multer = require('multer');
// const config = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'imagestore');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   }),
//   limits: {
//     fileSize: 50000000
//   }
// });


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
